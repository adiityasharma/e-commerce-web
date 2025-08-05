import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/features/shop/cartSlice";
import { toast } from "sonner";

const CartItemContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCartItemDelete = (productId) => {
    dispatch(deleteCartItem({ userId: user?.user?.id, productId })).then(
      (data) => {
        if (data?.payload?.succuss) {
          toast.success("Item Removed.");
        } else {
          toast.error("Failed to remove item.");
        }
      }
    );
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover border-1"
      />
      <div className="flex-1 ">
        <h3 className="font-semibold ">{cartItem?.title}</h3>
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
      <div className="flex flex-col items-end ">
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
