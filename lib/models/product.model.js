import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Strings
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: [{ type: String, required: true }],
    title: { type: String, required: true },
    // StockStage
    StockStage: { type: String },
    reviewStarCount: { type: String, required: true },
    ratingsCount: { type: String, required: true },
    // Numbers :
    discountRate: { type: Number },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    // Arrays :
    users: [{ email: { type: String, required: true } }],
    default: [],
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
