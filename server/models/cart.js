import mongoose, { model, Schema } from "mongoose";

const CartSchema = new Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        min: 1,
        required: true
      }
    },

  ]
}, { timestamps: true })

export const Cart = model("Cart", CartSchema)