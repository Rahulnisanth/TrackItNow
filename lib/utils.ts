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
