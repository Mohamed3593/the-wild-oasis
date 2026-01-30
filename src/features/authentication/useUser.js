import {  useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiLogin";

export function useUser() {
    const { data: user, isLoading } = useQuery({
       queryKey:["user"], queryFn:getUser,
    })

    console.log(user)
    return { user, isLoading,isAuthenticated:user?.role==="authenticated" }
}