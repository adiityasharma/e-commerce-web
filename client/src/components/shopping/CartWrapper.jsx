import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./CartItemContent";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItem, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItem && cartItem.length > 0
      ? cartItem.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md px-5 overflow-auto pb-5">
      <SheetHeader className="px-0">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-0 space-y-4">
        {cartItem && cartItem.length > 0
          ? cartItem.map((item, index) => (
              <CartItemContent cartItem={item} key={index} />
            ))
          : null}
      </div>
      <Separator />
      <div className="mt-0 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false)
        }}
        className="w-full mt-0"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
