"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

export default function ProductsWithFilter({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilter, setIsFilter] = useState(false);
  const [categorySlugs, setCategorySlugs] = useState([]);
  const [brandSlugs, setBrandSlugs] = useState([]);
  const { register, watch, control, setValue, getValues } = useForm();
  const { data: categories } = useFetchCategories();
  const { data: brands } = useFetchBrands();

  const handleCheckChange = (type, check, slug) => {
    if (type === "brand") {
      check
        ? setBrandSlugs((prev) => [...prev, slug])
        : setBrandSlugs((prev) => prev?.filter((item) => item !== slug));
    } else {
      check
        ? setCategorySlugs((prev) => [...prev, slug])
        : setCategorySlugs((prev) => prev?.filter((item) => item !== slug));
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    getValues("part")
      ? params.set("part", getValues("part"))
      : params.delete("part");

    categorySlugs.length
      ? params.set("categories", categorySlugs.join("_"))
      : params.delete("categories");

    brandSlugs.length
      ? params.set("brands", brandSlugs.join("_"))
      : params.delete("brands");

    router.push(`?${params.toString()}`);
    setIsFilter(false);
  };

  useEffect(() => {
    setValue("part", searchParams.get("part"));
    setCategorySlugs(searchParams.get("categories")?.split("_") ?? []);
    setBrandSlugs(searchParams.get("brands")?.split("_") ?? []);
  }, [searchParams]);

  useEffect(() => {
    if (watch("part") !== "oem") {
      setCategorySlugs([]);
      setBrandSlugs([]);
    }
  }, [watch("part")]);

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Button
          onClick={() => setIsFilter(!isFilter)}
          className="cursor-pointer"
        >
          Filter
        </Button>

        <div
          className={cn(
            "h-0 overflow-hidden rounded-md shadow-lg transition-all",
            {
              "h-96 p-4": isFilter,
            },
          )}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3">
              {/* by part type */}
              <div className="space-y-2">
                <H5>By part type</H5>
                <div>
                  <Controller
                    control={control}
                    name="part"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select part type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Part type</SelectLabel>
                            <SelectItem value="aftermarket">
                              Aftermarket
                            </SelectItem>
                            <SelectItem value="oem">OEM</SelectItem>
                            <SelectItem value="genuine">Genuine</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* by categories */}
              {watch("part") === "oem" && (
                <div className="space-y-2">
                  <H5>By Categories</H5>
                  <div className="space-y-2">
                    {categories?.map(({ id, name, slug }) => (
                      <div
                        key={id}
                        className="flex items-center justify-start gap-1"
                      >
                        <Checkbox
                          onCheckedChange={(check) =>
                            handleCheckChange("category", check, slug)
                          }
                          checked={categorySlugs?.includes(slug)}
                        />
                        <Label className="capitalize">{name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* by brands */}
              {watch("part") === "oem" && (
                <div className="space-y-2">
                  <H5>By Brands</H5>
                  <div className="space-y-2">
                    {brands?.map(({ id, name, slug }) => (
                      <div
                        key={id}
                        className="flex items-center justify-start gap-1"
                      >
                        <Checkbox
                          onCheckedChange={(check) =>
                            handleCheckChange("brand", check, slug)
                          }
                          checked={brandSlugs?.includes(slug)}
                        />
                        <Label className="capitalize">{name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleFilter}>Filter</Button>
          </div>
        </div>
      </div>

      {/* products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data?.length === 0 && (
          <P className={"col-span-4 text-center"}>No products found!</P>
        )}
        {data?.map(({ id, pictures, title, slug }) => (
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
