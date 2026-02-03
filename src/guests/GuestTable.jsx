
import Spinner from "../ui/Spinner"
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import useGuests from "./useGuests";
import GuestRow from "./GuestRow";
import Pagination from "../ui/Pagination";

// we use the Table compoent to make the column value in one place
function GuestTable() {
  const { guests, isLoading,count } = useGuests()
  if(isLoading)return(<Spinner/>)
  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1.2fr 3rem">
        <Table.Header role="row">
          <div>name</div>
          <div>email</div>
          <div>nationalId</div>
          <div>nationality</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(e) => <GuestRow guest={e} key={e.id} />}
        />
        <Table.Footer>
 
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable

