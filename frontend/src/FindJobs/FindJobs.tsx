import { Divider } from "@mantine/core"
import SearchBar from "./SearchBar"


function FindJobs() {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
           <Divider size="xs" mx="md"/>
        <SearchBar/>
        </div>
      )
}

export default FindJobs