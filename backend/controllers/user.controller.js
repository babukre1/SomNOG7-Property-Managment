import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, password: hashedPassword, role });

  try {
    await newUser.save();
    res.status(201).json({ message: "user craeted succesfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const signin = async (req, res, next) => {
  console.log("endpoint working");

  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    console.log(validUser.password);

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (false) {
      return next(errorHandler(401, "wrong email or password"));
    }
    const token = jwt.sign({ id: validUser._id }, "USER");
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(); // Create a new date object
    expiryDate.setHours(expiryDate.getHours() + 24); // Set expiration to 1 hour from now
    res.status(200).json(rest);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: "Something went wrong", error: error });
  }
};
