import mongoose from "mongoose";

let is_connected = false;

export const connect_to_database = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) {
    console.log("Warning: URI not existed, Please check the mongo_db URI");
    return;
  }
  if (is_connected) {
    console.log("=> Using existing database...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    is_connected = true;
    console.log("=> Connection established successfully!");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};
