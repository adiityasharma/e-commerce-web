import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDeleteProduct,
}) => {
  return (
    <Card className="w-full h-full max-w-sm mx-auto pt-0 pb-3">
      <div className="flex flex-col gap-2">
        <div className="relative ">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg "
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{product?.title}</h2>
          <div className="flex gap-2 items-center mb-2">
            <span
              className={` ${
                product?.salePrice > 0 ? "line-through text-gray-500" : ""
              } text-sm font-semibold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice !== 0 ? (
              <span className="text-xl font-semibold">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product?._id);
              setOpenCreateProductsDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              handleDeleteProduct(product?._id);
            }}
            variant="destructive"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
