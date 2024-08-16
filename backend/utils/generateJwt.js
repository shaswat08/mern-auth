import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateTokenAndSetCookie = (res, id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "5d" });
  res.cookie("jcookie", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
