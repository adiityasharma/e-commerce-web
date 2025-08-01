import { Product } from "../../models/product.model.js"



const getFilteredProducts = async (req, res) => {
  try {
    
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching filtered products"
    })
  }
}


export { getFilteredProducts }