import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../services/api Guests";
import toast from "react-hot-toast";
export function useDeleteGuest() {
    const queryClinet = useQueryClient();
    const { mutate: deleteGuest, isLoading } = useMutation({
      mutationFn:  deleteGuestApi,
      onSuccess: () => {
        toast.success("you delete the guest  sucssuflly");
queryClinet.invalidateQueries(["guests"])
      },
      onError: () => {
        toast.error("there is error with delete the  guest");
      },
    });
return { deleteGuest, isLoading };
}