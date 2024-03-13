"use client";
import React, { useState } from "react";
import ProductCard from "./cards/product";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { cn } from "@/lib/utils";
import { P } from "./ui/typography";
import Spinner from "./Spinner";

const fetchProducts = async (type) => {
  return await http().get(`${endpoints.products.getAll}?type=${type}`);
};

export default function ProductsWithTabs() {
  const [activeTab, setActiveTab] = useState("genuine");
  const { data, isLoading } = useQuery({
    queryKey: ["products", activeTab],
    queryFn: () => fetchProducts(activeTab),
    enabled: !!activeTab,
  });

  if (isLoading) return;

  // console.log({ data });
  return (
    <div className="bg-white">
      <div className="container space-y-4 pt-16">
        <ul className="flex items-center justify-start gap-4 border-b">
          {["genuine", "oem", "aftermarket"].map((item) => (
            <li
              key={item}
              className={cn(
                `cursor-pointer border-b-2 border-white px-2 py-3 text-sm font-semibold`,
                { "border-primary": item === activeTab },
              )}
            >
              <button className="uppercase" onClick={() => setActiveTab(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {isLoading && <Spinner />}
          {!data?.data?.length ? (
            <P>Not found!</P>
          ) : (
            data?.data?.map(({ id, title, pictures, slug }) => (
              <ProductCard
                key={id}
                title={title}
                slug={slug}
                image={pictures[0]}
                id={id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
