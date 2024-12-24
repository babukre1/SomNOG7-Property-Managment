import express from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

// Add a new property
router.post("/addProperty", addProperty);

// update a property
router.post("/updateProperty/:id", updateProperty);

// Get all properties
router.get("/getAllProperties", getAllProperties);

// Get a single property by ID
router.get("/getProperty/:id", getPropertyById);

router.delete("/deleteProperty/:id", deleteProperty);

export default router;
