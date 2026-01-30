import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
      const queryClinet = useQueryClient();
      const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: deleteBookingApi,
        // in case that the mutation is success
        onSuccess: () => {
          toast.success("the booking has been deleted");
          // force the clinet to refatch the data again
          queryClinet.invalidateQueries(["bookings"]);
        },
        // in the error case
        onError: () => {
          toast.error("there is an error in deleting the booking");
        },
      });
    return({isDeleting,deleteBooking})
}