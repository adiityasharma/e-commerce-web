import React, { use, useEffect, useState } from "react";
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
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { addReview, getReviews } from "@/features/shop/reviewSlice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };


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
    setRating(0);
    setReviewMsg("");
    setOpen(false);
    dispatch(setProductDetails());
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.user?.id,
        username: user?.user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Thankyou For Your Valuable Review.");
      } else {
        toast.info("You need to purchase this product first or you already reviewed this product.");
      }
    });
  };

  useEffect(() => {
    if (productDetails) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageRating =
    reviews &&
    reviews.length &&
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length;

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

          <div className="flex items-center ">
            <StarRating rating={averageRating} />
            <span className="text-sm ml-3 font-bold">({averageRating.toFixed(1)})</span>
          </div>

          <div className="w-fit mt-5">
            <Button
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
              className={`cursor-pointer ${
                productDetails?.totalStock <= 0 ? "opacity-50" : ""
              } `}
            >
              {productDetails?.totalStock <= 0 ? "Out of Stcok" : "Add to Cart"}
            </Button>
          </div>

          <div className="max-h-[300px] overflow-auto mt-5">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            {reviews && reviews.length > 0
              ? reviews.map((reviewItem, index) => (
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold ">{reviewItem.username}</h3>
                        </div>
                        <div className="flex ">
                          <StarRating rating={reviewItem.reviewValue} />
                        </div>
                        <p className="text-muted-foreground">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : "No Reviews"}
          </div>
          <div className="flex gap-2 mt-10 flex-col">
            <Label>Write a review</Label>
            <div className="flex">
              <StarRating
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Write a review..."
            />
            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ""}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
