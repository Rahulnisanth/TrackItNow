import { NextResponse } from "next/server";
import { connect_to_database } from "../../../../lib/mongoose";
import Product from "../../../../lib/models/product.model";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connect_to_database();
    const decodedEmail = decodeURIComponent(email);

    const trackedProducts = await Product.find({
      "users.email": decodedEmail,
    })
      .lean()
      .sort({ createdAt: -1 });

    if (!trackedProducts) {
      return NextResponse.json(
        { message: "No tracked Products found" },
        { status: 404 }
      );
    }

    if (!trackedProducts || trackedProducts.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Products found",
      data: trackedProducts,
    });
  } catch (error) {
    console.error("Error fetching searched products:", error);
    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
