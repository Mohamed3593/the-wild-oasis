import Button from "../../ui/Button";

import Modal from "../../ui/Modal"
import BookingForm from "./BookingForm";
function AddBooking() {
    return (
            <div>
            
          <Modal>
            <Modal.Open open="booking-form">
              <Button>add new booking</Button>
            </Modal.Open>
            <Modal.Window name="booking-form">
              <BookingForm/>
            </Modal.Window>
          </Modal>
            </div>
        );






    // const [isOpenModel,setIsOpenModel]=useState(false)
    // return (
    //   <div>
    //     <Button onClick={() => setIsOpenModel(!isOpenModel)}>
    //       add new cabin
    //     </Button>
    //     {isOpenModel && (
    //       <Modal onCloseButton={() => setIsOpenModel(!isOpenModel)}>
    //                 <CreateCabinForm onCloseButton={() => setIsOpenModel(!isOpenModel)} />
    //       </Modal>
    //     )}
    //   </div>

}

export default AddBooking;
