import express from "express";
import { addOwner, updateOwner, deleteOwner, getOwnerById, getOwners } from "../controllers/ownerController.js";
// import {
//   createOwner,
//   getOwners,
//   getOwnerById,
//   updateOwner,
//   deleteOwner,
// } from "../controllers/ownerController.js";

const router = express.Router();

// Create a new owner
router.post("/addOwner", addOwner);

// Get all owners
router.get("/getOwners", getOwners);

// Get a single owner by ID
router.get("/getOwnerById/:id", getOwnerById);

// Update an owner by ID
router.post("/updateOwner/:id", updateOwner);

// Delete an owner by ID
router.delete("/deleteOwner/:id", deleteOwner);

export default router;