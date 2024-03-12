"use client";
import React, { useState } from "react";
import ProductCard from "./cards/product";
import { H5, P } from "./ui/typography";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useFetchBrands } from "@/hooks/useFetchBrands";

export default function ProductsWithFilter({ data }) {
  const [isFilter, setIsFilter] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brandIds, setBrandIds] = useState([]);
  const [partType, setPartType] = useState("");

  const filteredData =
    !categoryIds.length && !brandIds.length && !partType
      ? data
      : data?.filter(
          (item) =>
            categoryIds.includes(item.category_id) &&
            brandIds.includes(item.brand_id) &&
            item.type === partType,
        );
  console.log({ filteredData });

  const { data: categories } = useFetchCategories();
  const { data: brands } = useFetchBrands();

  const handleCheckChange = (type, check, id) => {
    if (type === "brand") {
      check
        ? setBrandIds((prev) => [...prev, id])
        : setBrandIds((prev) => prev.filter((item) => item !== id));
    } else {
      check
        ? setCategoryIds((prev) => [...prev, id])
        : setCategoryIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handlePartChange = (part) => {
    setPartType(part);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div>
          <Button onClick={() => setIsFilter(!isFilter)}>Filter</Button>
        </div>
        <div
          className={cn(
            "h-0 overflow-hidden rounded-md shadow-lg transition-all",
            {
              "h-96 p-4": isFilter,
            },
          )}
        >
          <div className="grid grid-cols-3">
            {/* by part type */}
            <div className="space-y-2">
              <H5>By part type</H5>
              <div>
                <Select onValueChange={handlePartChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select part type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Part type</SelectLabel>
                      <SelectItem value="aftermarket">Aftermarket</SelectItem>
                      <SelectItem value="oem">OEM</SelectItem>
                      <SelectItem value="genuine">Genuine</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* by categories */}
            {partType === "oem" && (
              <div className="space-y-2">
                <H5>By Categories</H5>
                <div className="space-y-2">
                  {categories?.map(({ id, name }) => (
                    <div
                      key={id}
                      className="flex items-center justify-start gap-1"
                    >
                      <Checkbox
                        onCheckedChange={(check) =>
                          handleCheckChange("category", check, id)
                        }
                      />
                      <Label className="capitalize">{name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* by brands */}
            {partType === "oem" && (
              <div className="space-y-2">
                <H5>By Brands</H5>
                <div className="space-y-2">
                  {brands?.map(({ id, name }) => (
                    <div
                      key={id}
                      className="flex items-center justify-start gap-1"
                    >
                      <Checkbox
                        onCheckedChange={(check) =>
                          handleCheckChange("brand", check, id)
                        }
                      />
                      <Label className="capitalize">{name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {filteredData?.length === 0 && (
          <P className={"col-span-4 text-center"}>No products found!</P>
        )}
        {filteredData?.map(({ id, pictures, title, slug }) => (
          <ProductCard
            key={id}
            image={pictures[0]}
            title={title}
            id={id}
            slug={slug}
          />
        ))}
      </div>
    </div>
  );
}
