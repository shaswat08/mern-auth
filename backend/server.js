import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
