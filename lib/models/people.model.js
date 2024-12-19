import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profile_picture: { type: String },
    email: { type: String, required: true, unique: true },
    my_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const People = mongoose.models.People || mongoose.model("People", peopleSchema);

export default People;
