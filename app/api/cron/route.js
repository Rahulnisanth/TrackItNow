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
    await connect_to_database();
    const products = await Product.findAll();
    if (!products) throw new Error("No products found!");

    // Scrape all products in the database and update the price history :
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
        if (!scrapedProduct)
          throw new Error("No product found during scraping!");

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

        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        );

        // Check status of all products and send email accordingly :
        const emailType = getEmailNotifyType(scrapedProduct, updatedProduct);

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
      })
    );
    return NextResponse.json({
      message: "ok",
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Error in the GET => ${error}`);
  }
};
