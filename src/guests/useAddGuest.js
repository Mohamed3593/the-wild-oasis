import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGuest as addGuestApi } from "../services/api Guests";
import toast from "react-hot-toast";
export function useAddGuest() {
        const queryClinet = useQueryClient();
    const { mutate: addGuest, isLoading } = useMutation({
        mutationFn: addGuestApi,
        onSuccess: () => {
            toast.success("you add new guest")
            queryClinet.invalidateQueries(["guests"]);
        }
        ,onError: () => {
            toast.error("there is error with adding guest")
        }
    })
return { addGuest, isLoading };
}