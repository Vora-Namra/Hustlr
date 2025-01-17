import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Job } from "../JobDesc/Job";
import { RecommendedJobs } from "../JobDesc/RecommendedJob";

function JobDescPage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className="my-5 inline-block" to="/find-jobs">
        <Button color="brightSun.4" leftSection={<IconArrowLeft size={20} />}
          fullWidth
          variant="light">Back</Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <Job/>
        <RecommendedJobs/>
      </div>
    </div>
  );
}

export default JobDescPage;
