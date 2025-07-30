import express, { Router } from "express";
import { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct } from "../../controllers/admin/products.controller.js";
import { upload } from "../../config/cloudinary.js";

const router = Router();

router.post("/upload-image", upload.single("my_image"), handleImageUpload)
router.post("/add", addProduct)
router.put("/edit/:id", editProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/get", fetchAllProducts)


export default router;