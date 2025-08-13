import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/features/shop/cartSlice.js";
import { toast } from "sonner";

const CartItemContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  const handleCartItemDelete = (productId) => {
    dispatch(deleteCartItem({ userId: user?.user?.id, productId })).then(
      (data) => {
        toast.success("Item Removed.");
        if (!data?.payload?.success) {
          toast.info("Failed to remove item");
        }
      }
    );
  };

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItem = cartItems.items || [];

      if (getCartItem.length) {
        const indexOfCurrentCartItem = getCartItem.findIndex(
          (item) => item.productId === cartItem?.productId
        );

        const getCurrentProductIndex = productList?.findIndex(
          (item) => item._id === cartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItem[indexOfCurrentCartItem]?.quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.info(`Only ${getTotalStock} can be added for this item.`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    );
  };

  return (
    <div className="flex md:flex-row flex-col md:justify-between items-start space-x-4">
      <div className="flex justify-between gap-4">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-20 h-20 rounded object-cover border-1"
        />
        <div className="flex flex-col flex-1 justify-between">
          <h3 className="font-semibold text-sm">{cartItem?.title} </h3>
          <div className="flex items-center mt-1 gap-2">
            <Button
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">decrease</span>
            </Button>
            <span className="font-bold">{cartItem?.quantity}</span>
            <Button
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">increase</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col flex-row items-center justify-between w-full md:w-fit gap-3 md:items-end md:mt-0 mt-2">
        <p className="font-semibold ">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handleCartItemDelete(cartItem?.productId)}
          className="cursor-pointer mt-2 text-red-500 "
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItemContent;
