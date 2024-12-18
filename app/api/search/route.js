import { NextResponse } from "next/server";
import Product from "@/lib/models/product.model";
import { connect_to_database } from "../../../lib/mongoose";

export const GET = async (req) => {
  try {
    await connect_to_database();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || typeof query !== "string") {
      return NextResponse.json({ message: "Invalid query" }, { status: 400 });
    }

    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).lean();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No products found", data: [] },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Ok",
      data: products,
    });
  } catch (error) {
    console.error("Searching failed", error);
    return NextResponse.json(
      { message: "Error in searching", error: error.message },
      { status: 500 }
    );
  }
};
