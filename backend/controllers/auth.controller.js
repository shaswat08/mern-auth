import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email provided" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPass,
    });

    await user.save();

    res
      .status(201)
      .json({
        error: false,
        user: { id: user._id, username: user.username, email: user.email },
        message: "User created successfully",
      });
  } catch (error) {
    console.log("Error in the registerUser controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
