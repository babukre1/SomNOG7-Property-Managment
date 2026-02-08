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
app.use(cors({ origin: "http://localhost:5173" }));

// Connect to the database
Dbconnect();

app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/owner", ownerRoutes);
// app.use("/api/woner", ownerRoutes);

app.get("/api/hello", (req, res) => {
  console.log("endpoint working");

  res.json({ message: "hello world" });
});
const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});