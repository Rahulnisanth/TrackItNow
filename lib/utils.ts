import { PriceHistoryItem } from "./types";

// Price extractor :
export function extractPrice(...elements: any[]) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      return priceText.replace(/[^0-9.]/g, "");
    }
  }
  return "";
}

// Rating start extractor :
export function extractRatingStars(element: any) {
  const ratingStars = element.first().text().trim();
  if (ratingStars) {
    return ratingStars.replace(/[^0-9.]/g, "");
  }
  return "";
}

// Rating count extractor :
export function extractRatingsCount(element: any) {
  const ratingsCount = element.first().text().trim();
  if (ratingsCount) {
    return ratingsCount.replace(/[^0-9,]/g, "");
  }
  return "";
}

// Image urls extractor :
export function extractImages(imgAttribute: any) {
  let images = {};
  try {
    images = JSON.parse(imgAttribute);
  } catch (err) {
    console.log(err);
  }
  if (images) return Object.keys(images);
  return "";
}

// Currency type extractor :
export function extractCurrency(element: any) {
  const currencyType = element.first().text().trim();
  return currencyType ? currencyType : "";
}

// Discount extractor :
export function extractDiscount(element: any) {
  const discount = element.text().trim();
  return discount ? discount.replace(/[^0-9]/g, "") : "";
}

// Description Extractor :
export function extractDescription($: any) {
  const selectors = [
    "#productDescription p", // Main product description
    "#productDescription span", // Sometimes description is within spans
    "#feature-bullets .a-list-item", // Feature bullets
    ".aplus-v2 .aplus-module-wrapper", // A+ Content module wrapper
    ".aplus-module .aplus-text", // A+ Text Content
    ".techD .a-section .a-spacing-none", // Technical details section
  ];
  const unwantedPatterns = [
    /Electronics|Headphones|Headphones, Earbuds & Accessories|›/i, // Common breadcrumb text
    /₹[0-9,]+\.00/, // Price mentions
    /VIDEO|To view this video|Download Flash Player/i, // Video-related text
    /5 star[0-9%]+/, // Star ratings
    /Sort reviews by|Top reviews|Most recent/i, // Review-related text
  ];
  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .filter(
          (text: string) =>
            !unwantedPatterns.some((pattern) => pattern.test(text))
        )
        .join("\n");
      if (textContent.length > 0) {
        return textContent;
      }
    }
  }
  return "";
}

// Highest Price Extractor :
export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}

// Lowest-Price Extractor :
export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}

// Average-Price Extractor :
export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;
  return averagePrice;
}

// Format Number :
export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Node mailer accent :
// export const getEmailNotifType = (
//   scrapedProduct: Product,
//   currentProduct: Product
// ) => {
//   const lowestPrice = getLowestPrice(currentProduct.priceHistory);
//   if (scrapedProduct.currentPrice < lowestPrice) {
//     return Notification.LOWEST_PRICE as keyof typeof Notification;
//   }
//   if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
//     return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
//   }
//   if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
//     return Notification.THRESHOLD_MET as keyof typeof Notification;
//   }
//   return null;
// };
