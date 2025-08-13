import React, { useEffect } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "@/features/shop/orderSlice";
import { Badge } from "../ui/badge";

const ShoppingOrdersDetailsView = ({ orderDetails }) => {
  return (
    <DialogContent className="sm:max-w-[600px] ">
      <div className="grid gap-4">
        <div className="grid gap-1 md:text-lg text-[15px]">
          <div className="flex items-center justify-between mt-6 ">
            <p className="font-medium ">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Date</p>
            <Label>
              {new Date(orderDetails?.orderDate).toLocaleDateString("en-GB")}
            </Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="capitalize flex items-center justify-between ">
            <p className="font-medium ">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="capitalize flex items-center justify-between ">
            <p className="font-medium ">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Status</p>
            <Label className="capitalize">
              <Badge
                className={`${
                  orderDetails?.orderStatus == "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus == "rejected"
                    ? "bg-red-500"
                    : orderDetails?.orderStatus == "delivered"
                    ? "bg-green-500"
                    : "bg-blue-500"
                } capitalize py-1 rounded-full `}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-bold md:text-xl text-lg">Order Details</div>
            <ul className="grid gap-1 text-sm">
              {orderDetails?.cartItems?.map((cartItem, index) => (
                <li key={index} className="flex justify-between gap-5">
                  <div className="font-semibold md:text-sm text-[12px] ">
                    {cartItem.title}
                  </div>
                  <div className="flex justify-between gap-3 ">
                    <div className="flex">
                      <p>Qt:</p> {cartItem.quantity}
                    </div>
                    <div className=" flex justify-between">
                      <span>Price: </span> ${cartItem.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-bold md:text-xl text-lg">Shipping Info</div>
            <div className="grid gap-0.5 text-black/80 md:text-sm text-[13px] ">
              <span>
                <span className="font-semibold">Address:</span>{" "}
                {orderDetails?.addressInfo?.address}
              </span>
              <span>
                <span className="font-semibold">City:</span>{" "}
                {orderDetails?.addressInfo?.city}
              </span>
              <span>
                <span className="font-semibold">Pincode:</span>{" "}
                {orderDetails?.addressInfo?.pincode}
              </span>
              <span>
                <span className="font-semibold">Phone:</span>{" "}
                {orderDetails?.addressInfo?.phone}
              </span>
              <span>
                <span className="font-semibold">Notes:</span>{" "}
                {orderDetails?.addressInfo?.notes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrdersDetailsView;
