import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {

  return (
    <Card
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-2 bg-green-100/70 border-green-500"
          : null
      } `}
      onClick={() => setCurrentSelectedAddress(addressInfo)}
    >
      <CardContent className="grid gap-2">
        <div>
          <p className="font-bold">Address:</p> {addressInfo?.address}
        </div>
        <div>
          <span className="font-bold">City:</span> {addressInfo?.city}
        </div>
        <div>
          <span className="font-bold">Pincode:</span> {addressInfo?.pincode}
        </div>
        <div>
          <span className="font-bold">Phone:</span> {addressInfo?.phone}
        </div>
        <div>
          <span className="font-bold">Notes:</span> {addressInfo?.notes}
        </div>
      </CardContent>

      <CardFooter className="flex gap-1">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
