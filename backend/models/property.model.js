import mongoose from "mongoose";

// Property Schema
const PropertySchema = new mongoose.Schema(
  {
    propertyName: { type: String, required: true },
    address: { type: String, required: true },
    size: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "Agricultural", "Industrial"],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    documents: [{ type: String }], // URLs or file paths for documents
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    isSample: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);
export default Property;
