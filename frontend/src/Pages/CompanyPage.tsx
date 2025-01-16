import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import {  useNavigate } from "react-router-dom"
import { Company } from "../CompanyProfile/Company";
import { SimilarCompanies } from "../CompanyProfile/SimilarCompanies";

export const CompanyPage =()=>{
    const navigate=useNavigate();

    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs"/>
        <Button color="brightSun.4" my="md" onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20} />}
          variant="light">Back</Button>
      <div className="flex gap-5 justify-between">
        <Company/>
        <SimilarCompanies/>
      </div>
    </div>
}