import React from "react";
import image from "../../assets/account.jpg";
import Address from "@/components/shopping/Address";
import { useSelector } from "react-redux";
import CartItemContent from "@/components/shopping/CartItemContent";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const items = cartItems?.items;

  const totalCartAmount =
    items && items.length > 0
      ? items.reduce(
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
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden w-full ">
        <img
          src={image}
          alt="image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-5 p-5 md:px-10 ">
        <Address />
        <div className="flex flex-col gap-4 ">
          {items && items.length > 0
            ? items.map((item) => <CartItemContent cartItem={item} />)
            : null}

          <Separator/>

          <div className="mt-0 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full ">
            <Button className="w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
