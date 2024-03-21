"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import CartForm from "@/components/forms/cart";
import { useRouter } from "next/navigation";

const createEnquiry = (data) => {
  return http().post(endpoints.enquiries.getAll, { items: data });
};

const fetchTempCart = async () => {
  return await http().get(endpoints.cart.temp);
};

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart"],
  });

  const createMutation = useMutation(createEnquiry, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart");
      router.push("/");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });

  const handleCreate = (data) => {
    createMutation.mutate(data);
  };

  return (
    <section className="rounded-md p-4">
      <div className="container">
        <CartForm data={data?.data} handleCreate={handleCreate} />
      </div>
    </section>
  );
}
