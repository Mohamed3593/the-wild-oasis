import AddGuest from "../guests/AddGuest";
import AddGuestForm from "../guests/addGusetForm"
import GuestTable from "../guests/GuestTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading"
import Row from "../ui/Row"

function Guests() {
    return (
      <>
        <Row>
          <Heading as="h1">Guests</Heading>
          <AddGuest />
        </Row>

        <GuestTable />
      </>
    );
}

export default Guests
