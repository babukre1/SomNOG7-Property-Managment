import Owner from "../models/owner.model.js";
export const addOwner = async (req, res) => {
  const { fullName, contactInfo, governmentIdProof } = req.body;
  try {
    const newOwner = new Owner({ fullName, contactInfo, governmentIdProof });
    await newOwner.save();
    res
      .status(201)
      .json({ message: "Owner added successfully!", owner: newOwner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all owners
export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get owner by ID
export const getOwnerById = async (req, res) => {
  const { id } = req.params;
  try {
    const owner = await Owner.findById(id);
    if (!owner) return res.status(404).json({ message: "Owner not found!" });
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
