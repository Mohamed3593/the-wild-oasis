import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",

      }),
    onSuccess: (data) => {
      toast.success(`booking ${data.id} succussfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("there was an error while checking out");
    },
  });
  return { checkout, isCheckout };
}