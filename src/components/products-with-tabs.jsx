"use client";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import React, { useState } from "react";
import ProductCard from "./cards/product";

export default function ProductsWithTabs() {
  const [activeTab, setActiveTab] = useState("genuine");
  const { data } = useFetchProducts();
  console.log({ data });
  return (
    <div className="bg-white">
      <div className="container space-y-4 pt-16">
        <ul className="flex items-center justify-start gap-4 border-b">
          {["genuine", "oem", "aftermarket"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer border-b-2 px-2 py-3 text-sm font-semibold uppercase ${item === activeTab ? "border-primary" : "border-white"}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-6">
          {data?.data?.map(({ id, title, pictures }) => (
            <ProductCard key={id} title={title} image={pictures[0]} />
          ))}
        </div>
      </div>
    </div>
  );
}
