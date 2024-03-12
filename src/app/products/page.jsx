"use client";
import PaginationControls from "@/components/PaginationControls";
import AllProducts from "@/components/all-products";
import ProductsWithFilter from "@/components/products-with-filter";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { MainContext } from "@/store/context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

const fetchProducts = async (page, limit) => {
  return await http().get(
    `${endpoints.products.getAll}${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  );
};

export default function Page({ searchParams: { page: currPage, limit } }) {
  console.log({ currPage, limit });
  const { user } = useContext(MainContext);

  const { data, page, total_page } = useQuery({
    queryKey: ["products", currPage, limit],
    queryFn: () => fetchProducts(currPage, limit),
  });

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <ProductsWithFilter data={data?.data} />
        </div>
        <div>
          <PaginationControls total_page={total_page} />
        </div>
      </div>
    </section>
  );
}
