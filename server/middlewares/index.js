import Post from "../models/post";
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
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
