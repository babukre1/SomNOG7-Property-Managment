import express from "express";
import { createUploadUrl, getFile } from "../controllers/uploadController.js";

const router = express.Router();
router.post("/presign", createUploadUrl);
router.get("/file", getFile);

export default router;
