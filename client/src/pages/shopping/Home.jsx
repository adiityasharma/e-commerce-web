import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Shirt,
  Sparkles,
  Umbrella,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilterdProducts,
  fetchProductDetails,
} from "@/features/shop/productSlice.js";
import ShoppingProductTile from "@/components/shopping/ProductTile.jsx";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice.js";
import { toast } from "sonner";
import ProductDetails from "@/components/shopping/ProductDetails.jsx";
import { getFeatureImages } from "@/features/common-slice/featureSlice.js";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: Sparkles },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Umbrella },
];

const brandWithIcons = [
  { id: "nike", label: "Nike", icon: Umbrella },
  { id: "adidas", label: "Adidas", icon: Umbrella },
  { id: "puma", label: "Puma", icon: Baby },
  { id: "levi", label: "Levi's", icon: Sparkles },
  { id: "zara", label: "Zara", icon: WatchIcon },
  { id: "h&m", label: "H&M", icon: Shirt },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!featureImageList?.length) return; 
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilterdProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, []);

  const handleNavigateToListingPage = (categoryItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [categoryItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  const handleGetProductDetails = (currentProductId) => {
    dispatch(fetchProductDetails(currentProductId));
  };

  const handleAddToCart = (productId) => {
    dispatch(
      addToCart({ userId: user?.user?.id, productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.user?.id));
        toast.success("Added to cart");
      }
    });
  };

  useEffect(() => {
    if (productDetails) setOpenDetailDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full lg:h-[600px] md:h-[400px] sm:h-[300px] h-[200px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList?.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={index}
                className={` ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 w-full left-0 h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList?.length) %
                featureImageList?.length
            )
          }
        >
          <ChevronsLeftIcon className="w-4, h-4" />
        </Button>
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList?.length
            )
          }
        >
          <ChevronsRightIcon className="w-4, h-4" />
        </Button>
      </div>

      <section className="md:py-12 py-5 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="md:text-2xl text-xl font-bold text-center">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3  lg:grid-cols-6 md:gap-4 gap-2 mt-5">
            {brandWithIcons.map((brandItem, index) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center md:p-6">
                  <brandItem.icon className="md:w-12 md:h-12 md:mb-4 mb-2  text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="md:py-12 py-0 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="md:text-2xl text-xl font-bold text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2 mt-5">
            {categoriesWithIcons.map((categoryItem, index) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center md:p-6">
                  <categoryItem.icon className="md:w-12 md:h-12 md:mb-4 mb-2 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="md:py-12 mt-5 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="md:text-2xl text-xl font-bold text-center">Featured products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mt-10 mt-5">
            {productList && productList.length > 0
              ? productList.map((product, index) => (
                  <ShoppingProductTile
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                    product={product}
                    key={index}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
