import mongoose, { model, Schema } from "mongoose";


const ProductSchema = new Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number
})


export const Product = model("Product", ProductSchema);