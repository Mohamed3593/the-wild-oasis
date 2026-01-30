import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/aspi Cabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
      const queryClinet = useQueryClient();
      const { mutate:deleteCabin, isLoading: isDeleting } = useMutation({
        mutationFn: deleteCabins,
        // in case that the mutation is success
        onSuccess: () => {
          toast.success("the cabin has been deleted")
          // force the clinet to refatch the data again
          queryClinet.invalidateQueries(["cabin"])
        },
        // in the error case
        onError:()=>{toast.error("there is an error in deleting the cabin")}
      });
    return({isDeleting,deleteCabin})
}