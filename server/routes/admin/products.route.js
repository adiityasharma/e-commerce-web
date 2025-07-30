import express, { Router } from "express";
import { handleImageUpload } from "../../controllers/admin/products.controller.js";
import { upload } from "../../config/cloudinary.js";

const router = Router();

router.post("/upload-image", upload.single("my_image"), handleImageUpload)


export default router;