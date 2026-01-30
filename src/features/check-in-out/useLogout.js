import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout as logoutApi} from "../../services/apiLogin"
import {useNavigate } from "react-router-dom";
export function useLogout() {
    const navigate=useNavigate()
    const queryClinet = useQueryClient()
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClinet.removeQueries()
            navigate("/login",{replace:true})
        }
    })
    return {logout,isLoading}
}