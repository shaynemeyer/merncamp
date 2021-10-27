import express from "express";
import formidable from "express-formidable";
import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
  newsFeed,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  totalPosts,
  posts,
} from "../controllers/post";
import { requireSignin, canEditAndDeletePost } from "../middlewares";

const router = express.Router();

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

// posts
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put(
  "/update-post/:_id",
  requireSignin,
  canEditAndDeletePost,
  updatePost
);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditAndDeletePost,
  deletePost
);
router.get("/news-feed/:page", requireSignin, newsFeed);

// likes
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);

// comments
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);

router.get("/total-posts", totalPosts);

router.get("/posts", posts);

module.exports = router;
