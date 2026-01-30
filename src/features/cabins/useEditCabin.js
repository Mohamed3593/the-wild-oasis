import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/aspi Cabins";
import toast from "react-hot-toast";

export function useEditCabin() {
          const queryClinet = useQueryClient();
      const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => CreateEditCabin(newCabinData, id),
        onSuccess: () => {
          toast.success("you update  this cabin");
          queryClinet.invalidateQueries({ queryKey: ["cabin"] });
          
        },
        onError: () => toast.error("there is an error with editing cabin"),
      });
    return({isEditing,editCabin})
}