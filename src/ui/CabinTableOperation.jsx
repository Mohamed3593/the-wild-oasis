import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import SortBy from "./SortBy";
function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-des", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (Low first)" },
          { value: "regularPrice-des", label: "Sort by Price (Hight first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low first)" },
          { value: "maxCapacity-des", label: "Sort by capacity (Hight first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
