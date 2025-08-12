import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const registerUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({ success: false, message: "username, email, password are requried" });
    }

    const isUniqueUsername = await User.findOne({ username });

    if (isUniqueUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json({ success: true, message: "Registertion successful" })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "something went wrong",
      message: error.message
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ success: false, message: "email and password are requried" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ success: false, message: "invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production", // true on Render
      sameSite: "None" // needed for cross-site cookies
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username
      }
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
      message: error.message
    })
  }
}

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false
    }).status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong"
    });
  }
};



export { registerUser, loginUser, logoutUser };