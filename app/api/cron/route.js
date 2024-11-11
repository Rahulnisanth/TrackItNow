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
    // Connect to database
    await connect_to_database();

    const products = await Product.find({});
    if (!products) throw new Error("No product fetched");

    // SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape product
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: product.url,
          },
          product
        );

        // CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
        const emailType = getEmailNotifyType(scrapedProduct, currentProduct);

        if (emailType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent
          const emailContent = await generateEmailContent(
            productInfo,
            emailType
          );
          // Get array of user emails
          const userEmails = updatedProduct.users.map((user) => user.email);
          // Send email notification
          await sendEmail(emailContent, userEmails);
        }
        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
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
