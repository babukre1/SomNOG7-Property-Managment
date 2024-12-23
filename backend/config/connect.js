import mongoose from "mongoose";

export const Dbconnect = () => {
  mongoose
    .connect(
      "mongodb+srv://abubakr:12345@cluster0.kafxcze.mongodb.net/somnog?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Failed to connect to DB: ", err));
};