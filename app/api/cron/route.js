import { NextResponse } from "next/server";
import Product from "@/lib/models/product.model";
import { connect_to_database } from "../../../lib/mongoose";
import { scrapeAmazonProduct } from "../../../lib/scraper/index";
import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifyType,
} from "../../../lib/utils";
import { generateEmailContent, sendEmail } from "../../../lib/nodemailer/index";

export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = async () => {
  try {
    // Connect to the database
    await connect_to_database();

    // Fetch products with lean to optimize DB queries
    const products = await Product.find({}).lean();
    if (!products || products.length === 0)
      throw new Error("No products found");

    // Scrape and update product details
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        try {
          // Scrape product details
          const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
          if (!scrapedProduct) return null;

          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ];

          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          // Update product in the database
          const updatedProduct = await Product.findOneAndUpdate(
            { url: product.url },
            product,
            { new: true } // Ensure the updated document is returned
          ).lean();

          if (!updatedProduct) return null;

          // Check each product's status and send email notifications
          const emailType = getEmailNotifyType(scrapedProduct, currentProduct);
          if (emailType && updatedProduct.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };
            const emailContent = await generateEmailContent(
              productInfo,
              emailType
            );

            const userEmails = updatedProduct.users.map((user) => user.email);
            await sendEmail(emailContent, userEmails);
          }

          return updatedProduct;
        } catch (err) {
          console.error(
            `Error processing product with URL: ${currentProduct.url}`,
            err
          );
          return null; // Continue processing other products if one fails
        }
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts.filter(Boolean), // Remove null values from failed products
    });
  } catch (error) {
    console.error("CRON job failed:", error);
    return NextResponse.json(
      {
        message: "Error in CRON job",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
