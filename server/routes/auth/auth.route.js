import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth/auth.controller.js";


const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);




export default router;