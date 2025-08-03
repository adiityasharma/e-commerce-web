import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-col flex gap-2">
          <div className="h-auto">
            <h1 className="text-3xl font-bold capitalize">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            Price:
            <p
              className={` ${
                productDetails?.salePrice > 0
                  ? "line-through text-gray-400 text-sm"
                  : ""
              } font-bold text-3xl`}
            >
              ${productDetails?.price}
            </p>
            <p
              className={`${
                productDetails?.salePrice > 0 ? "block" : "hidden"
              } font-bold text-primary text-xl`}
            >
              ${productDetails?.salePrice}
            </p>
          </div>

          <div className="flex items-center text">
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <span className="text-sm">(4.5)</span>
          </div>

          <div className="w-fit mt-5">
            <Button className="cursor-pointer">Add to Cart</Button>
          </div>

          <div className="max-h-[300px] overflow-auto mt-5">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Aditya Sharma</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an Awesome Product.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Input placeholder="Write a review..." /> 
            <Button>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
