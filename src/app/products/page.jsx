"use client";
import PaginationControls from "@/components/PaginationControls";
import ProductsWithFilter from "@/components/products-with-filter";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

const fetchProducts = async (page = 1, limit, categories, brands, part) => {
  const urlParams = new URLSearchParams();

  if (part) {
    urlParams.append("type", part);
  }
  if (categories) {
    urlParams.append("categories", categories);
  }
  if (brands) {
    urlParams.append("brands", brands);
  }
  if (page) {
    urlParams.append("page", Math.max(1, page));
  }
  if (limit) {
    urlParams.append("limit", limit);
  }

  const url = `${endpoints.products.getAll}?${urlParams.toString()}`;
  return await http().get(url);
};

export default function Page({
  searchParams: { page: currPage, limit, categories, brands, part },
}) {
  const { data } = useQuery({
    queryKey: ["products", currPage, limit, categories, brands, part],
    queryFn: () => fetchProducts(currPage, limit, categories, brands, part),
  });

  console.log({ data });

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <ProductsWithFilter data={data?.data} />
        </div>
        <div>
          <PaginationControls total_page={data?.total_page} />
        </div>
      </div>
    </section>
  );
}
