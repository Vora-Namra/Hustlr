import { Divider } from "@mantine/core"
import { Company } from "../CompanyProfile/Company"
import { SimilarCompanies } from "../CompanyProfile/SimilarCompanies"
import { PostedJob } from "../PostedJob/PostedJob"

export const PostedJobPage=()=>{
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <Divider size="xs"/>
  <div className="flex gap-5 justify-between">
    <PostedJob/>
  </div>
</div>
}