import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import dbConnect from "./config/db.js";


dotenv.config()
dbConnect();


const app = express();

const PORT = process.env.PORT || 3002

app.use(cors({
  origin: "http://localhost:5173/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}))

app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`)
})