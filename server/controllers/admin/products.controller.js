import { imageUplaodUtil } from "../../config/cloudinary.js";
import { Product } from "../../models/product.model.js";


const handleImageUpload = async (req, res) => {
  try {

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64
    const result = await imageUplaodUtil(url)

    res.json({
      success: true,
      result
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

//  add product
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })

    await newProduct.save()

    res.status(201).json({
      success: true,
      data: newProduct
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

// fetch all product

const fetchAllProducts = async (req, res) => {
  try {

    const listOfProducts = await Product.find({});

    res.status(200).json({
      success: true,
      data: listOfProducts
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

// edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    const product = await Product.findById(id);

    if (!product) return res.status(404).json({
      success: false,
      message: "Product not found"
    })

    product.image = image || product.image
    product.title = title || product.title
    product.description = description || product.description
    product.category = category || product.category
    product.brand = brand || product.brand
    product.price = price || product.price
    product.salePrice = salePrice || product.salePrice
    product.totalStock = totalStock || product.totalStock;

    await product.save();
    res.status(200).json({
      success: true,
      data: product
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

// edit a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({
      success: false,
      message: "Product not found"
    })

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}


export { handleImageUpload, fetchAllProducts, editProduct, deleteProduct, addProduct }