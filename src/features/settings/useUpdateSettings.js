import {  useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI} from "../../services/apiSettings";
export function useUpdateSettings() {
          const queryClinet = useQueryClient();
      const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: () => {
          toast.success("you update  settings");
          queryClinet.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: () => toast.error("there is an error with editing settings"),
      });
    return { isUpdating, updateSettings };
}