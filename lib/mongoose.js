import mongoose from "mongoose";

let is_connected = false;

export const connect_to_database = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI)
    return console.log(
      "Warning: URI not existed, Please check the mongo_db URI"
    );
  if (is_connected) return console.log("=> Using existing database...");
  else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      is_connected = true;
      console.log("=> Connect established successfully!");
    } catch (err) {
      console.log(err);
    }
  }
};
