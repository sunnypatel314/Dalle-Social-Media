import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/Post.js";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// GET ALL POSTS
router.route("/").get(authToken, async (req, res) => {
  try {
    const posts = await Post.find({});
    res
      .status(200)
      .json({ success: true, data: posts, user: req.user.username });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// CREATE A POST
router.route("/").post(authToken, async (req, res) => {
  try {
    const { prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log(req.user.username);
    const newPost = await Post.create({
      name: req.user.username,
      prompt,
      photo: photoUrl.url,
      postId: Date.now(),
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// DELETE A POST
router.route("/:postId").delete(authToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOne({ postId, name: req.user.username });
    if (!post) {
      console.log("deletion failed");
      res.status(404).json({ error: "Item not found" });
      return;
    }
    await Post.deleteOne({ postId, name: req.user.username });
    console.log("deletion successful");
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Item not found" });
  }
});

export default router;
