import mongoose from "mongoose";

export const Dbconnect = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Failed to connect to DB: ", err));
};
