import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"
import { useQuery } from "@tanstack/react-query"
export function useRecentStays() {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
    // to convert the date to string and get the first date and the last one
    const dateQuery = subDays(new Date(), numDays).toISOString()
    const { data: stays, isLoading } = useQuery({
        queryKey: ["stays", `last ${numDays}`],
        queryFn: () => getStaysAfterDate(dateQuery),
    })
    const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out")
    return { confirmedStays, isLoading, stays }
} 