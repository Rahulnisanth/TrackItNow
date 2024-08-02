"use server";

export async function ScrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;
  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
  } catch (err: any) {
    throw new Error(`Failed to create/update product: ${err.message}`);
  }
}
