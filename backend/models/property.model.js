const mongoose = require("mongoose");

// Property Schema
const PropertySchema = new mongoose.Schema(
  {
    propertyName: { type: String, required: true },
    address: { type: String, required: true },
    size: { type: Number, required: true },
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "Agricultural", "Industrial"],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documents: [{ type: String }], // URLs or file paths for documents
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
