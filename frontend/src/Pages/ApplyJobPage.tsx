import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApplyJobComp } from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

function ApplyJobPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(()=>{
    window.scrollTo(0,0);
    getJob(id).then((res)=>{
      setJob(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[id])
  return (
      <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs" />
        <Button my="md" color="brightSun.4" leftSection={<IconArrowLeft size={20} />}
          fullWidth onClick={()=>{navigate(-1)}}
          variant="light">Back</Button>
        <ApplyJobComp {...job}/>

      </div>
    );
  }
  
  export default ApplyJobPage;