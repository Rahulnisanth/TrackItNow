import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    discountRate: { type: Number },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    description: { type: String },
    reviewStarCount: { type: String },
    ratingsCount: { type: String },
    StockStage: { type: String },
    default: [],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
