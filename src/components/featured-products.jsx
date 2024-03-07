"use client";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import React, { useState } from "react";
import ProductCard from "./cards/product";
import { H3 } from "./ui/typography";

export default function FeaturedProducts() {
  const { data } = useFetchProducts();
  console.log({ data });
  return (
    <div className="bg-white">
      <div className="container space-y-4 pt-16">
        <H3 className={"border-b pb-4"}>
          <span className="border-b-2 border-primary py-3">Featured </span>
          products
        </H3>
        <div className="grid grid-cols-6">
          {data?.data?.map(({ id, title, pictures }) => (
            <ProductCard key={id} title={title} image={pictures[0]} />
          ))}
        </div>
      </div>
    </div>
  );
}
