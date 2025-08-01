import { filterOptions } from "@/config/formControl";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFliter = ({filters, handleFilters }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold ">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>
            <h1 className="text-base font-semibold capitalize text-gray-700 cursor-pointer">
              {keyItem}
            </h1>
            <div className="grid gap-2 mt-2 pb-5">
              {filterOptions[keyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 font-normal pl-5"
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id)> -1
                    }
                    onCheckedChange={() => handleFilters(keyItem, option.id)}
                  />
                  {option?.label}
                </Label>
              ))}
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFliter;
