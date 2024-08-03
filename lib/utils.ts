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
  return discount ? discount.replace(/-[^0-9]%/g, "") : "";
}
// Description extractor :
export function extractDescription($: any) {
  const selectors = [".a-unordered-list .a-list-item", ".a-expander-content p"];
  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }
  return "";
}
