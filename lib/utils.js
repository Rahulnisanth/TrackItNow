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
      return priceText.replace(/[^0-9.]/g, "");
    }
  }
  return "";
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
  return discount ? discount.replace(/[^0-9]/g, "") : "";
}

// Highest Price Extractor :
export function getHighestPrice(priceList) {
  return priceList.reduce(
    (highest, current) => (current.price > highest.price ? current : highest),
    priceList[0]
  );
}

// Lowest Price Extractor :
export function getLowestPrice(priceList) {
  return priceList.reduce(
    (lowest, current) => (current.price < lowest.price ? current : lowest),
    priceList[0]
  );
}

// Average Price Extractor :
export function getAveragePrice(priceList) {
  if (priceList.length === 0) return 0;
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  return sumOfPrices / priceList.length;
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
