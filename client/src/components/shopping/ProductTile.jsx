import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full h-full pt-0 pb-3 max-w-sm mx-auto ">
      <div>
        <div
          onClick={() => {
            handleGetProductDetails(product?._id);
          }}
          className="relative"
        >
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] lg:h-[250px] md:h-[180px] object-cover rounded-t-lg cursor-pointer"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg truncate font-semibold mb-2 capitalize">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground capitalize">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground capitalize">
              {product?.brand}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <span
              className={` ${
                product?.salePrice > 0 ? "line-through text-sm" : ""
              } text-lg font-semibold text-gray-400`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary ">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => handleAddToCart(product?._id)}
            className="w-full cursor-pointer"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
