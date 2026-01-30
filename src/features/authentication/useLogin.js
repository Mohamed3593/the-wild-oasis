import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi} from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClinet=useQueryClient()
    const navigate=useNavigate()
    const { mutate: login, isLoading: isLogin } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password })
        , onSuccess: (user) => {
            navigate("/",{repalce:true})
            queryClinet.setQueryData(["user"],user.user)
        }, onError: (error) => {
            if (error.message.includes("rate limit")) {
                toast.error(" please try again later")   
            } else {
                
                toast.error("email or password are incorrect")
            }
        }
    });
    return{login,isLogin}
}