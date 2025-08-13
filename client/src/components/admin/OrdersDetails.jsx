import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Form from "../common/Form.jsx";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/features/admin/orderSlice.js";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

const AdminOrdersDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success("Order status updated.");
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[650px] h-[90vh] overflow-auto">
      <div className="grid gap-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium ">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Date</p>
            <Label>
              {new Date(orderDetails?.orderDate).toLocaleDateString()}
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
            <Label>
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
            <div className="font-bold text-xl">Order Details</div>
            <ul className="grid gap-1 text-sm">
              {orderDetails?.cartItems?.map((cartItem, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-10"
                >
                  <div className="flex items-center justify-between w-[80%]">
                    <span className="font-semibold">{cartItem.title}</span>
                    <span>Quantity: {cartItem.quantity}</span>
                  </div>
                  <div className="w-[20%] flex items-center justify-between">
                    <span>Price:</span> ${cartItem.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-bold text-xl">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground ">
              <span>Name: {user?.user?.username}</span>
              <span>Address: {orderDetails?.addressInfo?.address} </span>
              <span>City: {orderDetails?.addressInfo?.city}</span>
              <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
              <span>Phone: {orderDetails?.addressInfo?.phone}</span>
              <span>Notes: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <Form
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                placeholder: "Order Status",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProccess", label: "In Proccess" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrdersDetailsView;
