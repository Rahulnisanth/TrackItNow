const THRESHOLD_PERCENTAGE = 60;

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

// Price extractor :
export function extractPrice(...elements) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      return Number(priceText.replace(/[^0-9.]/g, ""));
    }
  }
  return null;
}

// Rating start extractor :
export function extractRatingStars(element) {
  const ratingStars = element.first().text().trim();
  return ratingStars ? ratingStars.replace(/[^0-9.]/g, "") : "";
}

// Rating count extractor :
export function extractRatingsCount(element) {
  const ratingsCount = element.first().text().trim();
  return ratingsCount ? ratingsCount.replace(/[^0-9,]/g, "") : "";
}

// Image urls extractor :
export function extractImages(imgAttribute) {
  try {
    return Object.keys(JSON.parse(imgAttribute));
  } catch (e) {
    return [];
  }
}

// Currency type extractor :
export function extractCurrency(element) {
  const currencyType = element.first().text().trim();
  return currencyType || "";
}

// Discount extractor :
export function extractDiscount(element) {
  const discount = element.text().trim();
  return discount ? Number(discount.replace(/[^0-9]/g, "")) : null;
}

export function getHighestPrice(priceList) {
  let highestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}

export function getLowestPrice(priceList) {
  let lowestPrice = priceList[0];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}

export function getAveragePrice(priceList) {
  let averagePrice = 0;
  for (let i = 0; i < priceList.length; i++) {
    averagePrice += priceList[i].price;
  }
  return priceList.length > 0 ? averagePrice / priceList.length : 0;
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
  let ratings = parseInt(string_ratings, 10);
  let reviews = parseInt(string_reviews, 10);

  const fiveStarPercentage = 0.25;
  const fourStarPercentage = 0.25;

  const recommendedRatings =
    reviews * (fiveStarPercentage + fourStarPercentage);

  return (recommendedRatings / reviews) * 100;
};

// Node mailer accent :
export const getEmailNotifyType = (scrapedProduct, currentProduct) => {
  if (
    !scrapedProduct ||
    !currentProduct ||
    !Array.isArray(currentProduct.priceHistory)
  ) {
    return null;
  }

  const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET;
  }
  return null;
};
