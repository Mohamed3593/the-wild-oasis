import { useQuery } from "@tanstack/react-query";

import { getAllBookings } from "../../services/apiBookings";


export function useAllBookings() {
  

      const {
        data: Allbookings,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["Allbooking"],
        queryFn: getAllBookings
      });
    return( {Allbookings,isLoading,error})
}