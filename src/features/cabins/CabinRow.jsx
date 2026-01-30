import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.1) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    id: cabinID,
    description,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin,isCreating } = useCreateCabin();
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }
  return (
    <Table.Row role="row">
      <Img src={image} />

      <Cabin>{name}</Cabin>
      <div>first up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* بص يا معلم انت هنا محتاج حاجة ان ال edit and delete must be inside the mune.list */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />
            <Menus.List id={cabinID}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} disabled={isCreating}>
                Dublicate
              </Menus.Button>
              <Modal.Open open="edit">
                <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
              </Modal.Open>
              <Modal.Open open="delete">
                <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinID)}
              resourceName={name}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
