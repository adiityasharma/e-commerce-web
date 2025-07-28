import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../../controllers/auth/auth.controller.js";
import { authenticateToken } from "../../middlewares/auth/auth.middleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/checkAuth", authenticateToken, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  })
})




export default router;