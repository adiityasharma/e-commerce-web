import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs"

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

    res.status(201).json({ success: true, message: "Registertion successful", user: newUser })

  } catch (error) {
    console.log(error);
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
      return res.status(404).json({ message: "email and password are requried" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "user does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user
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



export { registerUser, loginUser };