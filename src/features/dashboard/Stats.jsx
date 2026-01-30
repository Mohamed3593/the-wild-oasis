import { HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export function Stats({ bookings, confirmedStays, occupation }) {
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Booking"
        value={bookings?.length}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="sales"
        value={formatCurrency(
          confirmedStays?.reduce((total, stay) => total + stay.totalPrice, 0),
        )}
        color="green"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="check ins"
        value={confirmedStays?.length}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}
