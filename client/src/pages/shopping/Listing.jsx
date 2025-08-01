import ProductFliter from "@/components/shopping/ProductFliter";
import ShoppingProductTile from "@/components/shopping/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/formControl";
import { fetchAllFilterdProducts } from "@/features/shop/productSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const {productList} = useSelector(state=> state.shopProducts)

  useEffect(() => {
    dispatch(fetchAllFilterdProducts());
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6  ">
      <ProductFliter />

      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold ">All Products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {
            productList?.map((product) => (
              <ShoppingProductTile key={product._id} product={product}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
