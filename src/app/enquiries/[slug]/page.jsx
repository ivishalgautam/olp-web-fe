"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
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
import { MdDelete } from "react-icons/md";
import { endpoints } from "../../../utils/endpoints";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const updateEnquiry = (data) => {
  return http().put(`${endpoints.enquiries.getAll}/${data.order_id}`, data);
};

const deleteOrderItem = ({ id }) => {
  return http().delete(`${endpoints.enquiries.getAll}/order-items/${id}`);
};

const convertToOrder = ({ id }) => {
  return http().post(`${endpoints.enquiries.getAll}/convertToOrder/${id}`);
};

export default function Page({ params: { slug } }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation(updateEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      // queryClient.invalidateQueries("enquiries");
      router.push("/");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation(deleteOrderItem, {
    onSuccess: (data) => {
      const index = fields.findIndex((so) => so._id === data.data.id);
      remove(index);
      toast.success("enquiry deleted");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleDelete = ({ id }) => {
    deleteMutation.mutate({ id });
  };

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        setIsLoading(true);
        const { data } = await http().get(
          `${endpoints.enquiries.getAll}/${id}`,
        );
        console.log({ data });
        remove();
        data && setValue("status", data.status);
        data &&
          data?.items?.map((ord) =>
            append({
              _id: ord.id,
              image: ord.pictures[0],
              title: ord.title,
              quantity: ord.quantity,
              status: ord.status,
              available_quantity: ord.available_quantity,
              comment: ord.comment,
              slug: ord.slug,
            }),
          );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(slug);
  }, [slug]);

  const onSubmit = (data) => {
    const payload = {
      status: data.status,
      items: data.items,
    };
    handleCreate(payload);
  };

  async function handleCreate(data) {
    updateMutation.mutate({ ...data, order_id: slug });
  }

  const convertToOrderMutation = useMutation(convertToOrder, {
    onSuccess: (data) => {
      toast.success(data?.message ?? "Coverted to order.");
      queryClient.invalidateQueries("enquiries");
      router.push("/customer/orders");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  const handleConvertToOrder = ({ id }) => {
    convertToOrderMutation.mutate({ id });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="py-6">
      <div className="container rounded-md bg-white p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableCaption>{fields?.length === 0 && "Empty"}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Available quantity</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields?.map((field, key) => (
                <TableRow key={field.id}>
                  {/* image */}
                  <TableCell>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${field.image}`}
                      width={100}
                      height={100}
                      alt={field.title}
                    />
                  </TableCell>

                  {/* name */}
                  <TableCell>
                    <Link
                      href={`/products/${field.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {field.title}
                    </Link>
                  </TableCell>

                  {/* quantity */}
                  <TableCell>{getValues(`items.${key}.quantity`)}</TableCell>

                  {/* enquiry_status */}
                  <TableCell className="capitalize">
                    {getValues(`items.${key}.status`)?.split("_").join(" ")}
                  </TableCell>

                  {/* available quantity */}
                  <TableCell>
                    {getValues(`items.${key}.available_quantity`) ?? "N/A"}
                  </TableCell>

                  {/* comment */}
                  <TableCell>
                    {getValues(`items.${key}.comment`) ?? "N/A"}
                  </TableCell>

                  {/* action */}
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
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="default"
                onClick={() => handleConvertToOrder({ id: slug })}
              >
                Convert to order
              </Button>
              <Button type="submit" variant="primary">
                Submit query
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
