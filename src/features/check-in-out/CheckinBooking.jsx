import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox  from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckIn } = useCheckin();
  const { settings, isLoading: isLoadingSett } = useSettings()
  
  // we want to make it checked if we knowed it is paid from the the database
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);
  if (isLoading || isLoadingSett) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking||{}
  const optionalBreakfastPrice = settings.breakFastPrice * numGuests*numNights
  
  function handleCheckin() {
    
    if (!confirmPaid)return 
    if (addBreakfast) { checkin({ bookingId, breakfast: {hasBreakfast:true, extrasPrice:optionalBreakfastPrice,totalPrice:optionalBreakfastPrice+totalPrice} }) } else {
      
      checkin({bookingId,breakfast:{}});
    }
  }

  return (
    <>
      <Row type="hor">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            want to add a breakfast for {formatCurrency(optionalBreakfastPrice)}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          id={bookingId}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckIn}
        >
          I confirm that {guests.fullName} has paid the total amount of
          {addBreakfast
            ? ` ${formatCurrency(totalPrice + optionalBreakfastPrice)}(${formatCurrency(
                totalPrice,
              )}+
                 ${formatCurrency(optionalBreakfastPrice)}
              )`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid|| isCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
