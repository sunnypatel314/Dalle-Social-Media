import express from "express";
import User from "../mongodb/models/User.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

// LOGIN;
router.route("/log-in").post(async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          password: user.password,
        },
        "secret123"
      );
      return res.json({ status: "ok", token: token, user: user.username });
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid credientals" });
    }
  } else {
    return res.json({ status: "error", user: false });
  }
});

// SIGNUP;
router.route("/sign-up").post(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });
    if (existingEmail && existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Email and username is already in use",
      });
    } else if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    } else if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username is already in use",
      });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 15);
      const newUser = await User.create({
        username,
        email,
        password: encryptedPassword,
      });
      return res.status(201).json({ success: true, data: newUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
