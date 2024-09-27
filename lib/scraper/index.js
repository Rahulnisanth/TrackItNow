import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDiscount,
  extractPrice,
  extractRatingsCount,
  extractRatingStars,
} from "../utils";

export async function scrapeAmazonProduct(url) {
  if (!url) return;

  // Bright data proxy configurations :
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

  // Scraping utils :
  try {
    const response = await axios.get(url, options);
    // Cheerio utils :
    const $ = cheerio.load(response.data);
    const productImgAttrs =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";
    const productImages = Object.keys(JSON.parse(productImgAttrs));
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
      $("#averageCustomerReviews #acrCustomerReviewLink #acrCustomerReviewText")
    );
    const currentPrice = extractPrice(
      $(
        ".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-price-whole"
      )
    );
    const originalPrice = extractPrice($(".a-price.a-text-price .a-offscreen"));
    const currencyType = extractCurrency($(".a-price-symbol"));

    // Converting into data with scraped details of the product :
    const data = {
      url: url,
      image: productImages,
      currency: currencyType,
      title: productTitle,
      reviewStarCount: ratingsStar,
      ratingsCount: ratingsCount,
      stockStage: isStockAvail,
      discountRate: Number(discount),
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    // console.log(data);
    return data;
  } catch (err) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}
