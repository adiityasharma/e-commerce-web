import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authenticateToken = (req, res, next) => {

  const { token } = req.cookies
  
  if (!token) {
    return res.status(401).json({success: false, erorr:"Unauthorized! Please Log In"})
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ success: false, erorr: "Invalid token! Please Log In" })
    req.user = user
    next();
  })
}

export {authenticateToken}