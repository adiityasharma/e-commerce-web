import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authenticateToken = (req, res, next) => {

  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized! Please Log In" })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      const message = err.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token. Please log in again.";

      return res.status(403).json({ success: false, error: message });
    }
    req.user = user
    // console.log(user)
    next();
  })
}

export { authenticateToken }