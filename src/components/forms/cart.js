import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Input } from "../ui/input";
import { Small } from "../ui/typography";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";

const deleteCartItem = ({ id }) => {
  return http().delete(`${endpoints.cart.temp}/${id}`);
};

export default function CartForm({ data, handleCreate }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const deleteMutation = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      const index = fields.findIndex((so) => so._id === data.data.id);
      remove(index);
      toast.success(data.message);
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  const onSubmit = (data) => {
    handleCreate(data.items);
  };

  useEffect(() => {
    remove();
    data?.data?.map((prd) =>
      append({
        _id: prd.id,
        product_id: prd.product_id,
        title: prd.title,
        image: prd.pictures[0],
        quantity: "",
      }),
    );
  }, [data]);

  return (
    <div className="rounded-md bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableCaption>{fields?.length === 0 && "Empty"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.map((field, key) => (
              <TableRow key={field.id}>
                <TableCell>
                  <div className="relative size-14 overflow-hidden rounded-md">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${field.image}`}
                      fill
                      alt={field.title}
                    />
                  </div>
                </TableCell>
                <TableCell>{field.title}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    {...register(`items.${key}.quantity`, {
                      required: "required",
                      valueAsNumber: true,
                    })}
                    placeholder="Enter quantity"
                    className="w-auto"
                  />
                  {errors?.items?.[key] && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]?.["quantity"].message}
                    </Small>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete({ id: field._id })}
                  >
                    <MdDelete size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {fields?.length > 0 && (
          <div className="text-end">
            <Button type="submit">Submit query</Button>
          </div>
        )}
      </form>
    </div>
  );
}
