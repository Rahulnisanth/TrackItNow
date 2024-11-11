import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    StockStage: { type: String },
    reviewStarCount: { type: String, required: true },
    ratingsCount: { type: String, required: true },
    discountRate: { type: Number },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    users: [{ email: { type: String, required: true } }],
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
