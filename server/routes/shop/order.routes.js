import express, { Router } from "express";
import { createOrder } from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create", createOrder);


export default router;