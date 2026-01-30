import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useQuery } from "@tanstack/react-query"
export function useRecentBooking() {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
    // to convert the date to string and get the first date and the last one
    const dateQuery = subDays(new Date(), numDays).toISOString()
    const { data: bookings, isLoading } = useQuery({
        queryKey: ["booking", `last ${numDays}`],
        queryFn: () => getBookingsAfterDate(dateQuery),
    })
    return { bookings, isLoading, numDays }
}