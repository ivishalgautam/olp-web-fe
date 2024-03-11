import { useQuery } from "@tanstack/react-query";
import http from "../utils/http.js";
import { endpoints } from "@/utils/endpoints.js";

const fetchProducts = async () => {
  return await http().get(`${endpoints.products.getAll}`);
};

export function useFetchProducts() {
  return useQuery(["products"], () => fetchProducts());
}
