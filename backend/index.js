import express from "express";
// import mongoose from "mongoose";
import userRoutes from "./routes/auth.route.js";
import { Dbconnect } from "./config/connect.js";
import cors from "cors";

const app = express();

// Connect to the database
Dbconnect();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/user", userRoutes);
// app.use("/api/property", propertyRoutes);
// app.use("/api/woner", ownerRoutes);

app.get("/api/hello", (req, res) => {
  console.log("endpoint working");
  
  res.json({ message: "hello world" });
});

app.listen(3004, () => {
  console.log("server listening on port 3004");
});
