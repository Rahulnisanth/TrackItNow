import axios from "axios";
import * as cheerio from "cheerio";
import {
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
    const productTitle = $("#productTitle").text().trim();
    const isStockAvail = $("#availability .a-size-medium").text().trim();
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
    // Output printing :
    console.log({
      productTitle,
      ratingsStar,
      ratingsCount,
      isStockAvail,
      currentPrice,
      originalPrice,
    });
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}
