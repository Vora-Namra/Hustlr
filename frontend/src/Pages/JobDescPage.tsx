import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { Job } from "../JobDesc/Job";
import { RecommendedJobs } from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

function JobDescPage() {
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
      <Divider size="xs"/>
      <Link className="my-5 inline-block" to="/find-jobs">
        <Button color="brightSun.4" leftSection={<IconArrowLeft size={20} />}
          fullWidth
          variant="light">Back</Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <Job {...job}/>
        <RecommendedJobs/>
      </div>
    </div>
  );
}

export default JobDescPage;