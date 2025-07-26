import { User } from "../../models/user.model.js";

const registerUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({ message: "username, email, password are requried" });
    }

    const user = await User.find({ email });

    if (user) {
      return res.status(404).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json({ success: true, message: "user create", user: newUser })

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

    const user = await User.find({ email });

    if (!user) {
      return res.json({ message: "user does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }



  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
      message: error.message
    })
  }
}



export { registerUser };