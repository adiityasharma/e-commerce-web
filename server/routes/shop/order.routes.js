import express, { Router } from "express";
import { createOrder,capturePayment } from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);


export default router;