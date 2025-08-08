import express, { Router } from "express";
import { addAddress, deleteAddress, fetchAllAddress, editAddress } from "../../controllers/shop/address.controller.js";


const router = Router();


router.get("/get/:userId", fetchAllAddress)
router.post("/add", addAddress)
router.delete("/delete/:userId/:addressId", deleteAddress)
router.put("/update/:userId/:addressId", editAddress)


export default router;