import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiLogin";

export function useUpdateUser() {
          const queryClinet = useQueryClient();
      const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (user) => {
          toast.success("user account successfully updated");
          queryClinet.setQueryData(["user"],user)
          // queryClinet.invalidateQueries({ queryKey: ["user"] });
          
        },
        onError: () => toast.error("there is an error with updating the user"),
      });
    return { updateUser, isUpdating };
}