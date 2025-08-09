import paypal from "../../config/paypal.js"
import { Order } from "../../models/order.model.js";
import { Cart } from "../../models/cart.js";




const createOrder = async (req, res) => {

  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId
    } = req.body;


    const formattedItems = cartItems?.map(item => ({
      name: item.title,
      sku: String(item.productId || ""),
      price: Number(item.price).toFixed(2),
      currency: "USD",
      quantity: Number(item.quantity)
    }))

    const total = formattedItems
      .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
      .toFixed(2);


    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel"
      },
      transactions: [
        {
          item_list: {
            items: formattedItems
          },
          amount: {
            currency: "USD",
            total: total
          },
          description: "description"
        }
      ]
    }


    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("paypal validation error", JSON.stringify(error.response, null, 2));

        return res.status(500).json({
          success: false,
          message: error.message
        })
      }
      else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount: total,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId
        })

        await newlyCreatedOrder.save()

        const approvalURL = paymentInfo.links.find((link) => link.rel === "approval_url").href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder?._id
        })
      }
    })

  } catch (error) {
    console.log("while creating order error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found"
      })
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId

    const cartId = order.cartId;

    console.log(cartId)

    await Cart.findByIdAndDelete(cartId)

    await order.save()

    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order
    })

  } catch (error) {
    console.log("while capturing payment", error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export { capturePayment, createOrder };