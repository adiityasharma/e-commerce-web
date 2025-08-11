import express, { Router } from "express";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "../../controllers/admin/feature.controller.js"


const router = Router();


router.post("/add", addFeatureImage)
router.get("/get", getFeatureImages)
router.delete("/delete/:id", deleteFeatureImage)


export default router;