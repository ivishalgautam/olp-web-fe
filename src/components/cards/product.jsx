"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { H6 } from "../ui/typography";
import { Button } from "../ui/button";
import { IoBagHandleOutline } from "react-icons/io5";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MainContext } from "@/store/context";
import Link from "next/link";
import { cn } from "@/lib/utils";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}/temp-cart`, data);
};

export default function ProductCard({
  id,
  slug,
  title,
  pictures,
  type,
  category_name,
  category_slug,
  brand_name,
  brand_slug,
}) {
  const { user } = useContext(MainContext);
  const queryClient = useQueryClient();
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddTocart = async (id) => {
    if (!user) return toast.warning("Please login first");
    if (!user.is_verified) return toast.warning("You are not verified!");
    createMutation.mutate({ product_id: id });
  };

  return (
    <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-md bg-white p-2 shadow-sm">
      <span
        className={cn(
          "absolute left-2 top-2 z-10 rounded-full px-2 py-1 text-sm capitalize text-white",
          {
            "bg-lime-500": type === "genuine",
            "bg-red-500": type === "aftermarket",
            "bg-blue-500": type === "oem",
          },
        )}
      >
        {type}
      </span>
      <div className="flex flex-col gap-1">
        <Link href={`/products/${slug}`}>
          <figure className="overflow-hidden rounded-lg">
            <Image
              width={500}
              height={500}
              src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${pictures[0]}`}
              alt={title}
              className="h-full w-full object-cover object-center transition-transform hover:scale-110"
            />
          </figure>
        </Link>
        <Link
          href={`/categories/${category_slug}`}
          className="text-sm uppercase text-gray-400 transition-colors hover:text-primary"
        >
          {category_name}
        </Link>
        <div className="text-sm">
          Brand:{" "}
          <Link
            href={`/brands/${brand_slug}`}
            className="capitalize text-sky-500"
          >
            {brand_name}
          </Link>
        </div>
        <Link href={`/products/${slug}`}>
          <H6 className={"text-start text-sm"}>{title}</H6>
        </Link>
      </div>
      <div className="w-full border-t pt-5">
        <Button
          className="w-full bg-gray-100 text-black hover:text-white"
          onClick={() => handleAddTocart(id)}
        >
          <IoBagHandleOutline size={20} />
        </Button>
      </div>
    </div>
  );
}
