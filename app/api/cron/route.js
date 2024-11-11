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

export const maxDuration = 300;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = async () => {
  try {
    // Connect to database
    await connect_to_database();

    // Use find() instead of findAll()
    const products = await Product.find({});

    if (!products || products.length === 0) {
      console.log("No products found in database");
      return NextResponse.json({
        message: "No products found",
        data: [],
      });
    }

    console.log(`Starting price update for ${products.length} products`);

    // Scrape products in batches to avoid overwhelming the server
    const batchSize = 5;
    const updatedProducts = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchPromises = batch.map(async (currentProduct) => {
        try {
          // Scrape product data
          const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

          if (!scrapedProduct) {
            console.log(`Failed to scrape product: ${currentProduct.url}`);
            return null;
          }

          // Update price history
          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            {
              price: scrapedProduct.currentPrice,
              date: new Date(),
            },
          ];

          // Prepare updated product data
          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          // Update product in database
          const updatedProduct = await Product.findOneAndUpdate(
            { url: product.url },
            product,
            { new: true } // Return updated document
          );

          if (!updatedProduct) {
            console.log(`Failed to update product: ${product.url}`);
            return null;
          }

          // Handle email notifications
          if (updatedProduct.users && updatedProduct.users.length > 0) {
            const emailType = getEmailNotifyType(
              scrapedProduct,
              currentProduct
            );

            if (emailType) {
              const productInfo = {
                title: updatedProduct.title,
                url: updatedProduct.url,
              };

              const emailContent = await generateEmailContent(
                productInfo,
                emailType
              );
              const userEmails = updatedProduct.users.map((user) => user.email);

              try {
                await sendEmail(emailContent, userEmails);
                console.log(
                  `Notification sent for product: ${updatedProduct.title}`
                );
              } catch (error) {
                console.error(
                  `Failed to send email notification: ${error.message}`
                );
              }
            }
          }

          return updatedProduct;
        } catch (error) {
          console.error(
            `Error processing product ${currentProduct.url}: ${error.message}`
          );
          return null;
        }
      });

      // Wait for batch to complete and filter out null results
      const batchResults = (await Promise.all(batchPromises)).filter(Boolean);
      updatedProducts.push(...batchResults);

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < products.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log(`Successfully updated ${updatedProducts.length} products`);

    return NextResponse.json({
      message: "Success",
      data: updatedProducts,
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
