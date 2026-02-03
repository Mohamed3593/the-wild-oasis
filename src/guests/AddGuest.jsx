import Button from "../ui/Button";

import Modal from "../ui/Modal"
import AddGuestForm from "./AddGusetForm";
function AddGuest() {
    return (
            <div>
            
          <Modal>
            <Modal.Open open="guest-form">
              <Button>add new guest</Button>
            </Modal.Open>
            <Modal.Window name="guest-form">
              <AddGuestForm />
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

export default AddGuest;
