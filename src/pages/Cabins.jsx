
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable"

import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../ui/CabinTableOperation";
function Cabins() {

  return (
    <>
      <Row type="hor">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation/>
      </Row>

      <Row type="ver">
        <CabinTable />
      <AddCabin></AddCabin>
      </Row>
    </>
  );
}

export default Cabins;
