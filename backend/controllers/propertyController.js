import mongoose from "mongoose";
import Property from "../models/property.model.js";

// Add a new property
export const addProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res
      .status(201)
      .json({ message: "Property added successfully!", property: newProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "fullName contactInfo"
    );
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete property by ID
export const deleteProperty = async (req, res) => {
  const id = req.params.id.trim(); // Trim to remove whitespace and newline characters

  try {
    const property = await Property.findByIdAndDelete(id);
    if (!property)
      return res.status(404).json({ message: "Property not found!" });
    res.status(200).json({ message: "Property deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  const id = req.params.id.trim();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid property ID format!" });
  }
  try {
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found!" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const id = req.params.id.trim();
  const { propertyName, address, size, propertyType } = req.body;
  try {
    const property = await Property.findByIdAndUpdate(
      id,
      { propertyName, address, size, propertyType },
      { new: true }
    );
    if (!property)
      return res.status(404).json({ message: "Property not found!" });
    res
      .status(200)
      .json({ message: "Property updated successfully!", property });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};
