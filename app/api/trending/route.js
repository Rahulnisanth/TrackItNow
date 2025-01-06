import { NextResponse } from "next/server";
import { connect_to_database } from "../../../lib/mongoose";
import Product from "../../../lib/models/product.model";

export const GET = async () => {
  try {
    await connect_to_database();
    const products = await Product.find().sort({ createdAt: -1 }).limit(16);
    if (!products) {
      return NextResponse.json(
        { message: "No trending products found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Trending Products found",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return NextResponse.json(
      {
        message: "Error fetching trending products",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
