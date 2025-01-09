"use server";
import Product from "../models/product.model";
import People from "../models/people.model";
import { connect_to_database } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getLowestPrice, getHighestPrice, getAveragePrice } from "../utils";
import { revalidatePath } from "next/cache";
import { generateEmailContent, sendEmail } from "../nodemailer";

export async function ScrapeAndStoreProduct(productUrl, userEmail) {
  if (!productUrl || !userEmail) {
    console.error("Invalid product URL or user email.");
    return null;
  }
  try {
    await connect_to_database();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) {
      console.error("No product scraped.");
      return null;
    }
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: product.url });
    if (existingProduct) {
      const updatedPriceHistory = [
        ...(existingProduct.priceHistory || []),
        { price: scrapedProduct.currentPrice },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
      return null;
    }
    let newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    if (newProduct) {
      await People.findOneAndUpdate(
        { email: userEmail },
        { $addToSet: { my_products: newProduct._id } }
      );
      await revalidatePath(`/products/${newProduct._id}`);
      return { id: newProduct._id.toString() };
    } else {
      console.log("Failed to create new product while **ScrapingAndStoring");
      return null;
    }
  } catch (err) {
    console.error("Error in ScrapeAndStoreProduct:", err);
    throw new Error(`Failed to create/update product: ${err.message}`);
  }
}
export async function getProductById(productId) {
  try {
    await connect_to_database();
    const product = await Product.findOne({ _id: productId });
    if (!product) return "No product found!";
    return product;
  } catch (err) {
    console.log(err);
  }
}
export async function getSimilarProducts(productId) {
  try {
    await connect_to_database();
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .sort({ createdAt: -1 })
      .limit(8);
    if (!similarProducts) return [];
    return similarProducts;
  } catch (err) {
    console.log(err);
  }
}
export async function addUserEmailToProduct(productId, userEmail) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;
    const userExists = product.users.some((user) => user.email == userEmail);
    if (!userExists) {
      product.users.push({ email: userEmail });
      await product.save();
      const emailContent = await generateEmailContent(product, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (err) {
    console.log(err);
  }
}
