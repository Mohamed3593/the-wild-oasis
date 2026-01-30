import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { pageSize } from "../../utils/constance";


export function useBookings() {
  const queryClient=useQueryClient()
  const [searchParams] = useSearchParams();
  // filter
  const filterdValue = searchParams.get("status");
  const filter =
    !filterdValue || filterdValue === "all"
      ? null
      : { field: "status", value: filterdValue, method: "eq" };
  // sort
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };
  // pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const pageCount = Math.ceil(count / pageSize)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page+1],
      queryFn: () => getBookings({ filter, sortBy,page: page+1 }),
    });
  }
  if (page >1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page-1],
      queryFn: () => getBookings({ filter, sortBy,page: page-1 }),
    });
  }

  return { bookings, isLoading, error, count };
}