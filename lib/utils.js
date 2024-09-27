// Price extractor :
export function extractPrice(...elements) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      return priceText.replace(/[^0-9.]/g, "");
    }
  }
  return "";
}

// Rating start extractor :
export function extractRatingStars(element) {
  const ratingStars = element.first().text().trim();
  if (ratingStars) {
    return ratingStars.replace(/[^0-9.]/g, "");
  }
  return "";
}

// Rating count extractor :
export function extractRatingsCount(element) {
  const ratingsCount = element.first().text().trim();
  if (ratingsCount) {
    return ratingsCount.replace(/[^0-9,]/g, "");
  }
  return "";
}

// Image urls extractor :
export function extractImages(imgAttribute) {
  return Object.keys(JSON.parse(imgAttribute));
}

// Currency type extractor :
export function extractCurrency(element) {
  const currencyType = element.first().text().trim();
  return currencyType ? currencyType : "";
}

// Discount extractor :
export function extractDiscount(element) {
  const discount = element.text().trim();
  return discount ? discount.replace(/[^0-9]/g, "") : "";
}

// Highest Price Extractor :
export function getHighestPrice(priceList) {
  let highestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}

// Lowest-Price Extractor :
export function getLowestPrice(priceList) {
  let lowestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}

// Average-Price Extractor :
export function getAveragePrice(priceList) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;
  return averagePrice;
}

// Format Number :
export const formatNumber = (num = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Overall recommended buyers :
export const calculateRecommendedBuyers = (string_ratings, string_reviews) => {
  let ratings = parseInt(string_ratings);
  let reviews = parseInt(string_reviews);

  const fiveStarPercentage = 0.25;
  const fourStarPercentage = 0.25;

  const recommendedRatings =
    reviews * (fiveStarPercentage + fourStarPercentage);

  const recommendedPercentage = (recommendedRatings / reviews) * 100;

  return recommendedPercentage;
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
