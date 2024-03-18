"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function fetchEnquiries() {
  return await http().get(`${endpoints.enquiries.getAll}`);
}

async function deleteEnquiry({ id }) {
  return http().delete(`${endpoints.enquiries.getAll}/${id}`);
}

export default function Enquiries() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchEnquiries,
    queryKey: ["enquiries"],
  });

  const deleteMutation = useMutation(deleteEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return JSON.stringify(error);
  }

  const handleDelete = async ({ id }) => {
    deleteMutation.mutate({ id });
  };

  return (
    <div className="mt-5 rounded-lg border-input bg-white">
      <DataTable columns={columns(handleDelete)} data={data?.data} />
    </div>
  );
}
