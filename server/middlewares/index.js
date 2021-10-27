import Post from "../models/post";
import User from "../models/user";
import expressJwt from "express-jwt";

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditAndDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);

    if (req.user._id != post.postedBy) {
      return res.status(401).send("Unauthorized");
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
