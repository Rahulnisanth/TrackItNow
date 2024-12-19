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

    const userInfo = await People.find({ email: decodedEmail }).lean();
    if (userInfo.length === 0) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: userInfo,
    });
  } catch (error) {
    console.error("Error fetching user:", error.stack);
    return NextResponse.json(
      {
        message: "Error fetching user",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
