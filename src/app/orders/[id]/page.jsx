"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { H2, Small } from "@/components/ui/typography";
import { MdDelete } from "react-icons/md";

const createOrder = (data) => {
  return http().put(`${endpoints.orders.getAll}/${data.order_id}`, data);
};

const deleteOrderItem = ({ id }) => {
  return http().delete(`${endpoints.orders.getAll}/order-items/${id}`);
};

export default function Page({ params: { id } }) {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { status: "", items: [] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryFn: fetchOrderItems,
    queryKey: ["orders"],
    enabled: !!id,
  });

  async function fetchOrderItems() {
    return http().get(`${endpoints.orders.getAll}/getByOrderId/${id}`);
  }

  return (
    <div className="container rounded-md bg-white p-4">
      <Table>
        <TableCaption>
          {fields?.length > 0 ? "All orders" : "Empty"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Dispatched quantity</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((field, key) => (
            <TableRow key={field.id}>
              {/* image */}
              <TableCell>
                <div className="relative size-14 overflow-hidden rounded-md">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${field.pictures[0]}`}
                    fill
                    alt={field.title}
                  />
                </div>
              </TableCell>

              {/* name */}
              <TableCell>{field.title}</TableCell>

              {/* quantity */}
              <TableCell>{field.quantity}</TableCell>

              {/* dispatched quantity */}
              <TableCell>{field.dispatched_quantity}</TableCell>

              {/* comment */}
              <TableCell>{field.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-8">
        <H2>{data?.status?.split("_").join(" ")}</H2>
      </div>
    </div>
  );
}
