import express from "express";
import { deleteUser, getAllUsers, signin, signup } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getAllusers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);
// router.post("/signin", signin);

export default router;
