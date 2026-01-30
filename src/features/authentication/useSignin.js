import { useMutation } from "@tanstack/react-query";
import { signin as signinApi} from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useSignin() {
    const { mutate: signin, isLoading } = useMutation({
        mutationFn: signinApi,
        onSuccess: (user) => {
            console.log(user)
            toast.success("Account Successfully created ! please verufy the new account from user's email address"
            )
        }
    });
    return{signin,isLoading}
}