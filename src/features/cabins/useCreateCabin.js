import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/aspi Cabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
      const queryClient = useQueryClient();
      const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: CreateEditCabin,
        onSuccess: () => {
          toast.success("you add new cabin");
          queryClient.invalidateQueries({ queryKey: ["cabin"] });

        },
        onError: () => toast.error("there is an error with adding cabin"),
      });
    return({createCabin,isCreating})
}