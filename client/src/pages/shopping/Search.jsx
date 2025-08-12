import ProductDetails from "@/components/shopping/ProductDetails.jsx";
import ShoppingProductTile from "@/components/shopping/ProductTile.jsx";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice.js";
import { fetchProductDetails } from "@/features/shop/productSlice.js";
import {
  getSearchResult,
  resetSearchResult,
} from "@/features/shop/searchSlice.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResult } = useSelector((state) => state.shopSearch);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);
  const { productDetails } = useSelector(state => state.shopProducts);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResult());
    }
  }, [keyword]);

  const handleAddToCart = (productId, totalStock) => {
    console.log(cartItems);

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

  const handleGetProductDetails = (currentProductId) => {
      dispatch(fetchProductDetails(currentProductId));
    };

  useEffect(() => {
      if (productDetails) setOpenDetailDialog(true);
    }, [productDetails]);


  return (
    <div className="container mx-auto md:px-6 px-5 py-8 ">
      <div className="flex justify-center mb-8 lg:px-10">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-6 py-6"
            placeholder="Search products..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:px-10">
        {searchResult && searchResult.length
          ? searchResult.map((item) => (
              <ShoppingProductTile
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
                product={item}
              />
            ))
          : null}
      </div>
      <ProductDetails
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        productDetails={productDetails}
      />
      {searchResult.length === 0 ? (
        <h1 className="md:text-5xl text-3xl font-bold lg:px-10">
          No Result Found
        </h1>
      ) : null}
    </div>
  );
};

export default SearchProducts;
