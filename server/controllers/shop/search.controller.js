import { Product } from "../../models/product.model.js"



const searchProducts = async (req, res) => {
  try {

    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(404).json({
        success: false,
        message: "Keyword is required and must be in a string format"
      })
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx }
      ]
    }

    const searchResult = await Product.find(createSearchQuery);

    res.status(200).json({
      success: false,
      data: searchResult
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export {searchProducts}