import express, { Router } from "express";
import { getFilteredProducts } from "../../controllers/shop/shop.controller.js";


const router = Router();

router.get("/get", getFilteredProducts);




export default router;