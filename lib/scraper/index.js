import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDiscount,
  extractPrice,
  extractRatingsCount,
  extractRatingStars,
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
} from "../utils";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY = 2000;

export async function scrapeAmazonProduct(url) {
  if (!url) return;

  // Bright data proxy configurations:
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  let attempts = 0;
  let data = null;

  // Retry loop
  while (attempts < MAX_ATTEMPTS && !data) {
    try {
      const response = await axios.get(url, options);
      const $ = cheerio.load(response.data);

      const productImgAttrs =
        $("#imgBlkFront").attr("data-a-dynamic-image") ||
        $("#landingImage").attr("data-a-dynamic-image") ||
        "{}";

      let productImages = [];
      try {
        productImages = Object.keys(JSON.parse(productImgAttrs));
      } catch (e) {
        console.error("Error parsing image attributes:", e);
      }

      const productTitle = $("#productTitle").text().trim();
      const isStockAvail = $("#availability .a-size-medium").text().trim();
      const discount = extractDiscount(
        $(
          ".a-size-large.a-color-price.savingPriceOverride.reinventPriceSavingsPercentageMargin.savingsPercentage"
        )
      );
      const ratingsStar = extractRatingStars(
        $("#averageCustomerReviews #acrPopover .a-size-base.a-color-base")
      );
      const ratingsCount = extractRatingsCount(
        $(
          "#averageCustomerReviews #acrCustomerReviewLink #acrCustomerReviewText"
        )
      );
      const currentPrice = extractPrice(
        $(
          ".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-price-whole"
        )
      );
      const originalPrice = extractPrice(
        $(".a-price.a-text-price .a-offscreen")
      );
      const currencyType = extractCurrency($(".a-price-symbol"));

      // Construct the product data
      data = {
        url: url,
        image: productImages[0],
        currency: currencyType,
        title: productTitle,
        reviewStarCount: ratingsStar,
        ratingsCount: ratingsCount,
        stockStage: isStockAvail,
        discountRate: discount,
        currentPrice: currentPrice,
        originalPrice: originalPrice,
        lowestPrice: getLowestPrice([
          { price: currentPrice },
          { price: originalPrice },
        ]),
        highestPrice: getHighestPrice([
          { price: currentPrice },
          { price: originalPrice },
        ]),
        averagePrice: getAveragePrice([
          { price: currentPrice },
          { price: originalPrice },
        ]),
      };

      if (
        !data.image ||
        !data.title ||
        !data.currentPrice ||
        !data.highestPrice
      ) {
        data = null;
        attempts++;
        console.log(`Attempt ${attempts}: Retrying to fetch complete data...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    } catch (err) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, err.message);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  if (!data) {
    throw new Error(`Failed to scrape product after ${MAX_ATTEMPTS} attempts.`);
  }

  console.log("Successfully scraped product data:", data);
  return data;
}
