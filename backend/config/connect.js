import mongoose from "mongoose";

export const Dbconnect = () => {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.kafxcze.mongodb.net/somnog?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Failed to connect to DB: ", err));
};