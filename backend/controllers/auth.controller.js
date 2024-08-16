import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateJwt.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //checking if username or email already exists in the database

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    //throwing an error if the username or email already exists
    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "username or email already exists" });
    }

    //checking if username is provided in the request body
    if (!username) {
      return res
        .status(400)
        .json({ error: true, message: "Username required" });
    }

    //checking if email is provided in the request body
    if (!email) {
      return res.status(400).json({ error: true, message: "Email required" });
    }

    //validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email provided" });
    }

    //checking if password is provided in the request body
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password required" });
    }

    //encrypting password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    // creating a user in the database
    const user = new User({
      username,
      email,
      password: hashedPass,
    });

    await user.save();

    res.status(201).json({
      error: false,
      user: { id: user._id, username: user.username, email: user.email },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in the registerUser controller: ", error.message);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ error: true, message: "Username required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Username required" });
    }

    const isValidPass = await bcryptjs.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      error: false,
      message: `User: ${user.username} logged in successfully`,
    });
  } catch (error) {
    console.log("Error in the loginUser controller: ", error.message);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { jcookie } = req.cookies;

    if (!jcookie) {
      return res
        .status(400)
        .json({ error: true, message: "No active sessions" });
    }

    res.cookie("jcookie", "", { maxAge: 0 });

    res
      .status(400)
      .json({ error: false, message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in the logoutUser controller: ", error.message);
    res.status(500).json("Internal server error");
  }
};
