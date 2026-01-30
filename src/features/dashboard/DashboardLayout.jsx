import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { Stats } from "./Stats";
import SalesChart from "./SalesChart";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBooking();
  const {  isLoading: isLoading2, confirmedStays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner/>;
  const occupation =
    confirmedStays.reduce((total, stay) => total + stay.numNights, 0) /
    (numDays * cabins?.length);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        occupation={occupation}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart booking={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
