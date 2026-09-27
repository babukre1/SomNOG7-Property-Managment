import express from "express";
// import mongoose from "mongoose";
import userRoutes from "./routes/auth.route.js";
import propertyRoutes from "./routes/property.route.js";
import ownerRoutes from "./routes/owner.route.js";
import { Dbconnect } from "./config/connect.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ["https://property.abubakr.so", "https://propertymanagmentfrontend.vercel.app", "http://localhost:5173"];
app.use(cors({ origin: (origin, callback) => !origin || allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error("Origin not allowed")) }));

// Vercel functions may receive a request immediately after a cold start.
// Await a cached connection before allowing database-backed routes to run.
app.use(async (_req, res, next) => {
  if (_req.path === "/api/hello") return next();
  try {
    await Dbconnect();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({
      message: "Database service is unavailable.",
      code: "DATABASE_UNAVAILABLE",
    });
  }
});

app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/owner", ownerRoutes);
// app.use("/api/woner", ownerRoutes);

app.get("/api/hello", (req, res) => {
  console.log("endpoint working");

  res.json({ message: "hello world" });
});
const PORT = process.env.PORT || 3004;

if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
}

export default app;
