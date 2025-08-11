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
      <CardContent className="grid gap-4">
        <Label>
          <span className="font-bold">Address:</span> {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-bold">City:</span> {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-bold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="font-bold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label>
          <span className="font-bold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardContent>

      <CardFooter className="flex gap-1">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
