import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config/formControl";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/features/address/address.slice";
import { toast } from "sonner";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleManageAddress = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData)
      toast.warning("Only 3 Address can be added.")
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address Updated.");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address added.");
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.user?.id));
  }, []);

  const handleDeleteAddress = (currentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.user?.id, addressId: currentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.user?.id));
        toast.success("Address Deleted.");
      }
    });
  };

  const handleEditAddress = (currentAddress) => {
    setCurrentEditedId(currentAddress?._id);
    setFormData({
      ...formData,
      address: currentAddress?.address,
      city: currentAddress?.city,
      phone: currentAddress?.phone,
      pincode: currentAddress?.pincode,
      notes: currentAddress?.notes,
    });
  };

  return (
    <Card>
      <div className="px-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address, index) => (
              <AddressCard
                key={index}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={address}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId === null ? "Add New Address" : "Edit Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId === null ? "Add" : "Save"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
