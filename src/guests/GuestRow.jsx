import styled from "styled-components";



import { HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "../ui/Modal";

import Table from "../ui/Table";
import Menus from "../ui/Menus";
import AddGuestForm from "./AddGusetForm";
import { useDeleteGuest } from "./useDeleteGuest";
import ConfirmDelete from "../ui/ConfirmDelete";




const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const National = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function GuestRow({ guest }) {
  const {
    id:guestId,
    fullName,
    email,
    nationalID,
    nationality
  } = guest;
  const { deleteGuest,isLoading}=useDeleteGuest()
  return (
    <Table.Row role="row">
      <Name>{fullName}</Name>

      <Email>{email}</Email>

      <National>{nationalID}</National>
      <National>{nationality}</National>

      {/* بص يا معلم انت هنا محتاج حاجة ان ال edit and delete must be inside the mune.list */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestId} />
          <Menus.List id={guestId}>
            <Modal.Open open="edit">
              <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
            </Modal.Open>
            <Modal.Open open="delete">
              <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <AddGuestForm guestToEdit={guest} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isLoading}
            onConfirm={() => deleteGuest(guestId)}
            resourceName={fullName}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default GuestRow;
