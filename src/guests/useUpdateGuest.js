import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest as editGuestApi } from "../services/api Guests";
import toast from "react-hot-toast";

export function useUpdateGuest() {
  const queryClient = useQueryClient();
  const { mutate: editGuest, isLoading } = useMutation({
    mutationFn: (guestData) => editGuestApi(guestData), // ✅ استقبل الـ object كله
    onSuccess: () => {
      toast.success("Guest updated successfully");
      queryClient.invalidateQueries(["guests"]);
    },
    onError: () => {
      toast.error("There was an error updating the guest");
    },
  });
  return { editGuest, isLoading };
}
