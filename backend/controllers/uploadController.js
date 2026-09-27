import crypto from "node:crypto";
import path from "node:path";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { assertR2Configured, getR2Client } from "../config/r2.js";

const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const allowedCategories = new Set(["property", "owner", "identity", "tax"]);

export const createUploadUrl = async (req, res) => {
  try {
    assertR2Configured();
    const { filename, contentType, category = "property" } = req.body;
    if (!filename || !allowedTypes.has(contentType)) {
      return res.status(400).json({ message: "Only PDF, JPEG, PNG, and WebP documents are allowed." });
    }

    const safeCategory = allowedCategories.has(category) ? category : "property";
    const extension = path.extname(filename).toLowerCase().replace(/[^.a-z0-9]/g, "");
    const key = `${safeCategory}/${new Date().getUTCFullYear()}/${crypto.randomUUID()}${extension}`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      Metadata: { originalName: Buffer.from(filename).toString("base64") },
    });
    const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 600 });

    return res.json({
      uploadUrl,
      key,
      documentUrl: `/api/uploads/file?key=${encodeURIComponent(key)}`,
      expiresIn: 600,
    });
  } catch (error) {
    console.error("R2 presign failed:", error.message);
    return res.status(503).json({ message: "Document storage is unavailable.", code: "R2_UNAVAILABLE" });
  }
};

export const getFile = async (req, res) => {
  try {
    assertR2Configured();
    const key = String(req.query.key || "");
    if (!key || key.includes("..")) return res.status(400).json({ message: "Invalid document key." });

    const object = await getR2Client().send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));
    res.setHeader("Content-Type", object.ContentType || "application/octet-stream");
    res.setHeader("Cache-Control", "private, max-age=300");
    res.setHeader("Content-Disposition", `inline; filename="${path.basename(key)}"`);
    object.Body.pipe(res);
  } catch (error) {
    console.error("R2 download failed:", error.message);
    return res.status(error.name === "NoSuchKey" ? 404 : 503).json({ message: "Document could not be retrieved." });
  }
};
