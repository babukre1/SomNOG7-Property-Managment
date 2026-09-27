import mongoose from "mongoose";

let connectionPromise;

export const Dbconnect = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!process.env.CONNECTION_STRING) {
    throw new Error("CONNECTION_STRING is not configured");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.CONNECTION_STRING, { serverSelectionTimeoutMS: 8000 })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  await connectionPromise;
  return mongoose.connection;
};
