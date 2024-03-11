"use client";
import ProductCard from "./cards/product";
import { H3, P } from "./ui/typography";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const fetchProducts = async () => {
  return await http().get(`${endpoints.products.getAll}?featured=true`);
};

export default function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;

  // console.log({ products: data });
  return (
    <div className="bg-white">
      <div className="container space-y-4 pt-16">
        <H3 className={"border-b pb-4"}>
          <span className="border-b-2 border-primary py-3">Featured </span>
          products
        </H3>
        <div className="grid grid-cols-6">
          {!data?.length ? (
            <P>Not found!</P>
          ) : (
            data?.map(({ id, title, pictures, slug }) => (
              <ProductCard
                key={id}
                title={title}
                image={pictures[0]}
                slug={slug}
                id={id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
