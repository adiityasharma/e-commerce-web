import React, { useState } from "react";
import image from "../../assets/account.jpg";
import Address from "@/components/shopping/Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemContent from "@/components/shopping/CartItemContent";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/features/shop/orderSlice";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const items = cartItems?.items;
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

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

  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user?.user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4 ">
          {items && items.length > 0
            ? items.map((item, index) => (
                <CartItemContent key={index} cartItem={item} />
              ))
            : null}

          <Separator />

          <div className="mt-0 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full ">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
