import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "@/utils/http.js";

export const fetchCategories = async (page = 1, limit = 10) => {
  return await http().get(
    `${endpoints.categories.getAll}?page=${page}&limit=${limit}`,
  );
};

export function useFetchCategories(page, limit) {
  return useQuery(["categories"], () => fetchCategories(page, limit));
}
