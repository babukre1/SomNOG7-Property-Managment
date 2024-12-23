const Property = require("../model/property");

// Add a new property
exports.addProperty = async (req, res) => {
  const { propertyName, address, size, propertyType, owner, documents } =
    req.body;
  try {
    const newProperty = new Property({
      propertyName,
      address,
      size,
      propertyType,
      owner,
      documents,
    });
    await newProperty.save();
    res
      .status(201)
      .json({ message: "Property added successfully!", property: newProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
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

// Get property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id).populate(
      "owner",
      "fullName contactInfo"
    );
    if (!property)
      return res.status(404).json({ message: "Property not found!" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
