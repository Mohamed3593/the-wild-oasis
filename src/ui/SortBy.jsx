import { useSearchParams } from "react-router-dom"
import Select from "./Select"
function SortBy({ options }) {
    const [searchParmas,setSearchParams]=useSearchParams()
    function handleChange(e) {
        searchParmas.set("sortBy", e.target.value)
        setSearchParams(searchParmas)
    }
    const sortBy=searchParmas.get("sortBy")||""
    return <Select value={sortBy} options={options} onChange={handleChange} />;
}

export default SortBy
