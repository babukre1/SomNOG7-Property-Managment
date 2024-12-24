// import Owner from "../models/owner.model.js";
// export const addOwner = async (req, res) => {
//   const { fullName, contactInfo, governmentIdProof } = req.body;
//   try {
//     const newOwner = new Owner({ fullName, contactInfo, governmentIdProof });
//     await newOwner.save();
//     res
//       .status(201)
//       .json({ message: "Owner added successfully!", owner: newOwner });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all owners
// export const getAllOwners = async (req, res) => {
//   try {
//     const owners = await Owner.find();
//     res.status(200).json(owners);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get owner by ID
// export const getOwnerById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const owner = await Owner.findById(id);
//     if (!owner) return res.status(404).json({ message: "Owner not found!" });
//     res.status(200).json(owner);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import Owner from "../models/owner.model.js";

// Create a new owner
export const addOwner = async (req, res) => {
  try {
    const { fullName, contactInfo, governmentIdProof } = req.body;
    const newOwner = new Owner({ fullName, contactInfo, governmentIdProof });
    const savedOwner = await newOwner.save();
    console.log(savedOwner);

    res.status(201).json(savedOwner);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all owners
export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    if (owners.length === 0)
      return res.status(404).json({ message: "No owners found" });
    res.status(201).json(owners);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};

// Get a single owner by ID
export const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an owner by ID
export const updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOwner)
      return res.status(404).json({ message: "Owner not found" });
    res.status(200).json(updatedOwner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an owner by ID
export const deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner)
      return res.status(404).json({ message: "Owner not found" });
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
