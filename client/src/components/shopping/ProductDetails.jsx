import React, { use } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice";
import { toast } from "sonner";
import { setProductDetails } from "@/features/shop/productSlice";
import { Badge } from "../ui/badge";

const ProductDetails = ({ open, setOpen, productDetails }) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const {cartItems} = useSelector(state=> state.shopCart)

  const handleAddToCart = (productId, totalStock) => {
    let getCartItem = cartItems.items || [];

    if (getCartItem.length) {
      const indexOfCurrentItem = getCartItem.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem]?.quantity;
        if (getQuantity + 1 > totalStock) {
          toast.info(`Only ${totalStock} can be added for this item.`);
          return;
        }
      }
    }

    dispatch(
      addToCart({ userId: user?.user?.id, productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.user?.id));
        toast.success("Added to cart");
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false)
    dispatch(setProductDetails())
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover rounded-lg"
          />

          {productDetails?.totalStock <= 0 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 ">
              Out of Stock
            </Badge>
          ) : productDetails?.totalStock < 10 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 ">
              Only {productDetails?.totalStock} items left
            </Badge>
          ) : (
            <Badge className="absolute top-2 right-2 bg-green-500 ">
              {productDetails?.totalStock} Stocks Available
            </Badge>
          )}

          {productDetails?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 ">Sale</Badge>
          ) : null}
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
            <Button
              onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              className={`cursor-pointer ${
                productDetails?.totalStock <= 0 ? "opacity-50" : ""
              } `}
            >
              {productDetails?.totalStock <= 0 ? "Out of Stcok" : "Add to Cart"}
            </Button>
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
