import express from "express";

import {
  addOwner,
  getAllOwners,
  getOwnerById,
} from "../controllers/ownerController";


const router = express.Router();

// Add a new owner
router.post("/", addOwner);

// Get all owners
router.get("/", getAllOwners);

// Get a single owner by ID
router.get("/:id", getOwnerById);

module.exports = router;
