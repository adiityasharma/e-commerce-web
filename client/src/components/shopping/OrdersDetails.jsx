import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrdersDetailsView = () => {
  return (
    <DialogContent className="sm:max-w-[600px] ">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium ">Order ID</p>
            <Label>6454</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Date</p>
            <Label>27/12/25</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Price</p>
            <Label>$245</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium ">Order Status</p>
            <Label>In progress</Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground ">
              <span>Aditya</span>
              <span>Address</span>
              <span>city</span>
              <span>pincode</span>
              <span>phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrdersDetailsView;
