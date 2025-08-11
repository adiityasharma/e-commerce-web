import { Feature } from "../../models/feature.model.js";


const addFeatureImage = async (req, res) => {
  try {

    const { image } = req.body;

    const featureImages = new Feature({
      image
    })

    await featureImages.save()

    res.status(200).json({
      success: true,
      data: featureImages
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getFeatureImages = async (req, res) => {
  try {

    const images = await Feature.find({})

    res.status(200).json({
      success: true,
      data: images
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteFeatureImage = async (req, res) => {
  try {

    const { id } = req.params;
    
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Image id is required"
      })
    }

    const image = await Feature.findByIdAndDelete({ _id: id })

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found."
      })
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export { addFeatureImage, getFeatureImages, deleteFeatureImage }