import { imageUplaodUtil } from "../../config/cloudinary.js";


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
    req.json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}

export {handleImageUpload}