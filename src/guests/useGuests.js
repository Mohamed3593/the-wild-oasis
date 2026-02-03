import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGuests } from "../services/api Guests"
import { useSearchParams } from "react-router-dom";
import { pageSize } from "../utils/constance";

function useGuests() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const { data: { data: guests, count } = {}, isLoading } = useQuery({
      queryKey: ["guests", page],
      queryFn: () => getGuests({ page }),
    });
    const pageCount = Math.ceil((count || 0) / pageSize);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["guests", page + 1],
            queryFn: () => getGuests({ page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["guests", page - 1],
            queryFn: () => getGuests({ page: page - 1 }),
        });
    }
    return {
        guests,
        isLoading,
        count,
    };
}

export default useGuests
