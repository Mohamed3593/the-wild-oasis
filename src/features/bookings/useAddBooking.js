import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { AddBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useAddBooking() {
    const queryClient=useQueryClient()
    const { mutate: addNewBooking, isLoading } = useMutation({
        
        mutationFn: AddBooking,
        onSuccess: () => {
            toast.success("you add new booking")
            queryClient.invalidateQueries({queryKey: ["booking"]})
        }, onError:()=> {
        toast.error("there is error with adding booking")
        }
    })
    return { addNewBooking, isLoading };
}