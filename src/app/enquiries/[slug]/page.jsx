"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Small } from "@/components/ui/typography";
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
          `${endpoints.enquiries.getAll}/getByEnquiryId/${id}`,
        );
        remove();
        data && setValue("status", data.status);
        data && setValue("enquiry_status", data.enquiry_status);
        data && setValue("order_type", data.order_type);
        data &&
          data?.items?.map((ord) =>
            append({
              _id: ord.id,
              image: ord.pictures[0],
              title: ord.title,
              quantity: ord.quantity,
              dispatched_quantity: ord.dispatched_quantity,
              enquiry_status: ord.enquiry_status,
              available_quantity: ord.available_quantity,
              comment: ord.comment,
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
      enquiry_status: data.enquiry_status,
      order_type: data.order_type,
      items: data.items.map((item) => {
        if (item.enquiry_status !== "partially_available") {
          return { ...item, available_quantity: null };
        }
        if (data.order_type === "order") {
          return { ...item, comment: "" };
        }
        return item;
      }),
    };
    handleCreate(payload);
  };

  async function handleCreate(data) {
    updateMutation.mutate({ ...data, order_id: slug });
  }

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
                  <TableCell>{field.title}</TableCell>

                  {/* quantity */}
                  <TableCell>{getValues(`items.${key}.quantity`)}</TableCell>

                  {/* enquiry_status */}
                  <TableCell className="capitalize">
                    {getValues(`items.${key}.enquiry_status`)
                      ?.split("_")
                      .join(" ")}
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

          <div className="my-6 grid grid-cols-1 gap-4">
            <div>
              <Label>Convert to order</Label>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select onValueChange={onChange} required value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Convert" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order</SelectItem>
                      <SelectItem value="enquiry">Enquiry</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                name="order_type"
              />
              {errors?.order_type && (
                <Small className={"text-red-500"}>
                  {errors.order_type.message}
                </Small>
              )}
            </div>
          </div>

          {fields?.length > 0 && (
            <div className="text-end">
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
