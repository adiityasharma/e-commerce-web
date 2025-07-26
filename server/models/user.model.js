
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [/^[\w.-]+@[\w.-]+\.\w{2,}$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: "user"
  }
})

export const User = model("User", userSchema);
