import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
function BookingDetail() {
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate=useNavigate()
  function handleDelete() {
    deleteBooking(bookingId,{onSettled:()=>navigate(-1)})
  }
  const {booking,isLoading} =useBooking()
  const {status ,id:bookingId,} = booking||{}
const{checkout,isLoading:isCheckingOut}=useCheckout()
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
if(isLoading)return <Spinner/>
  return (
    <>
      <Row type="hor">
        <HeadingGroup>
          <Heading as="h1">booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <>
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check In
            </Button>
            <Modal>
              <Modal.Open open="delete">
                <Button variation="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  disabled={isDeleting}
                  onConfirm={ handleDelete}
                  resourceName="booking"
                />
              </Modal.Window>
            </Modal>
          </>
        )}
        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
            }}
          >
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
