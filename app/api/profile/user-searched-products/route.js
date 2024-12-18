import { NextResponse } from "next/server";
import { connect_to_database } from "../../../../lib/mongoose";
import People from "../../../../lib/models/people.model";

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

    const user = await People.findOne({ email: decodedEmail }).populate({
      path: "my_products",
      select: "_id title image ratingsCount currency currentPrice",
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const searchedProducts = user.my_products;

    if (!searchedProducts || searchedProducts.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Products found",
      data: searchedProducts,
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
