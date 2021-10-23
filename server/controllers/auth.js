import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const register = async (req, res) => {
  // console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  console.log(req.body);
  // validation
  if (!name) {
    return res.json({
      error: "Name is required!",
    });
  }

  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be at least 6 characters long!",
    });
  }

  if (!secret) {
    return res.json({
      error: "Answer is required!",
    });
  }

  const exist = await User.findOne({ email });

  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });

  try {
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log("REGISTER FAILED =>", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user in db
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found.",
      });
    }

    // check password
    const match = comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong password." });
    }

    // create signed token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async (req, res) => {
  console.log(req.body);
  const { email, newPassword, secret } = req.body;

  // validation
  if (!newPassword || newPassword.length < 6) {
    console.log(!newPassword, newPassword.length);
    return res.json({
      error:
        "New password is required and should be at least 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }

  const user = await User.findOne({ email, secret });

  if (!user) {
    return res.json({
      error: "We can't verify you with those details.",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });

    return res.json({
      success: "Congrats! Now you can login with your new password.",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something went wrong. Try again!",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    // console.log("profile update req.body", req.body);
    const data = {};
    const { username, about, name, password, secret, image } = req.body;

    if (username) {
      data.username = username;
    }

    if (about) {
      data.about = about;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.json({
          error: "Password is require and should be at least 6 characters long",
        });
      }
      data.password = await hashPassword(password);
    }

    if (secret) {
      data.secret = secret;
    }

    if (image) {
      data.image = image;
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    // console.log('updated user =>', user);

    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let following = user.following;
    following.push(user._id);

    const people = await User.find({ _id: { $nin: following } })
      .select("-password, -secret")
      .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

// middleware
export const addFollower = async (req, res, next) => {
  // console.log("ADD FOLLOWER", req.body);

  await User.findByIdAndUpdate(req.body._id, {
    $addToSet: { followers: req.user._id },
  });
  next();
};

export const userFollow = async (req, res) => {
  // console.log("USER FOLLOW", req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");

    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
