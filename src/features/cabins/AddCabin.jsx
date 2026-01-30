import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal"
function AddCabin() {
    return (
            <div>
            
          <Modal>
            <Modal.Open open="cabin-form">
              <Button>add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
              <CreateCabinForm />
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

export default AddCabin
