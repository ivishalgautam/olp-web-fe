import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "@/utils/http.js";

export const fetchBrands = async () => {
  return await http().get(endpoints.brands.getAll);
};

export function useFetchBrands() {
  return useQuery(["brands"], () => fetchBrands());
}
