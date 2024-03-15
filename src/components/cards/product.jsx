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

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}/temp-cart`, data);
};

export default function ProductCard({ id, slug, title, image }) {
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
    <div>
      <Link href={`/products/${slug}`}>
        <figure className="overflow-hidden rounded-lg">
          <Image
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform hover:scale-110"
          />
        </figure>
        <H6 className={"py-4 text-center"}>{title}</H6>
      </Link>
      <div className="border-t py-5">
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
