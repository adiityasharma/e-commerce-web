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
          {product?.totalStock <= 0 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 ">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 ">
              Only {product?.totalStock} items left
            </Badge>
          ) : (
            <Badge className="absolute top-2 right-2 bg-green-500 ">
              {product?.totalStock} Stocks Available
            </Badge>
          )}

          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 ">Sale</Badge>
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
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className={`w-full cursor-pointer ${
              product?.totalStock <= 0 ? "opacity-50" : null
            } `}
          >
            {product?.totalStock <= 0 ? "Out of Stcok" : "Add to Cart"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
