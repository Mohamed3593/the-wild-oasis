import AddGuest from "../guests/AddGuest";

import GuestTable from "../guests/GuestTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

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

export default Guests;
