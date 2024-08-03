import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDescription,
  extractDiscount,
  extractImages,
  extractPrice,
  extractRatingsCount,
  extractRatingStars,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
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
    const productImages = extractImages(
      $("#imgTagWrapperId img").attr("data-a-dynamic-image")
    );
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
    const description = extractDescription($);
    // Converting into data with scraped details of the product :
    const data = {
      imageUrls: productImages,
      title: productTitle,
      // To be debugged description extractor ...>>>
      // description: description,
      reviews: ratingsStar,
      ratings: ratingsCount,
      stock: isStockAvail,
      discount: discount,
      current_price: currentPrice,
      original_price: originalPrice,
      currency: currencyType,
    };
    console.log(data);
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}
