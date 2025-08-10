import { Order } from "../../models/order.model.js";



const getAllOrdersOfAllUsers = async (req, res) => {
  try {

    const orders = await Order.find({});

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found!"
      })
    }

    res.status(200).json({
      success: true,
      data: orders
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const getOrderDetailsForAdmin = async (req, res) => {
  try {

    const { id } = req.params;

    const order = await Order.findById(id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found!"
      })
    }

    res.status(200).json({
      success: true,
      data: order
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!"
      })
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status updated"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus }