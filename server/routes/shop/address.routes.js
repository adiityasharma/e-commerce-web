import express, { Router } from "express";
import { addAddress, deleteAddress, fetchAllAddress, editAddress } from "../../controllers/shop/address.controller.js";


const router = Router();


router.get("/get/:userId", fetchAllAddress)
router.post("/add", addAddress)
router.post("/delete/:userId/:addressId", deleteAddress)
router.post("/update/:userId/:addressId", deleteAddress)


export default router;