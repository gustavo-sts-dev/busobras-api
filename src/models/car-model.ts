import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    fuel: {
      type: String,
      enum: ["flex", "gasoline", "diesel", "electric", "hybrid"],
      default: "flex",
    },
    description: { type: String },
    photos: [{ type: String }],
    status: {
      type: String,
      enum: ["announced", "sold", "draft"],
      default: "announced",
    },
    advertiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);