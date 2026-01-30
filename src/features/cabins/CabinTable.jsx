
import Spinner from "../../ui/Spinner"
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
// we use the Table compoent to make the column value in one place
function CabinTable() {
  const [searchParms]=useSearchParams()
  const { cabins, isLoading, error } = useCabins()
  if (error) return
  if(isLoading) return <Spinner/>

  // applay the filter
  const filterValue = searchParms.get("discount")||"all"
  let filteredCabin
  if (filterValue === "all") filteredCabin=cabins
  if (filterValue === "no-discount") filteredCabin=cabins.filter(cabin=>cabin.discount!==0)
  if (filterValue === "with-discount") filteredCabin=cabins.filter(cabin=>cabin.discount===0)

  
  // appy the sort
  const sortBy = searchParms.get("sortBy") || "StartDate-asc"
  console.log(sortBy)
  const [field, dircetion] = sortBy.split("-")
  const modifire = dircetion === "asc" ? 1 : -1
  let sortedCabins;
  if (field === "name") {
    sortedCabins = filteredCabin.sort(
      (a, b) => a.name.localeCompare(b.name) * modifire
    );
  } else {
    sortedCabins = filteredCabin.sort(
      (a, b) => (a[field] - b[field]) * modifire
    );
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabins</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(e) => <CabinRow cabin={e} key={e.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable

