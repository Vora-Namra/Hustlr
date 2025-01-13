import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ApplyJobComp } from "../ApplyJob/ApplyJobComp";

function ApplyJobPage() {
    return (
      <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Link className="my-5 inline-block" to="/jobs">
        <Button color="brightSun.4" leftSection={<IconArrowLeft size={20} />}
          fullWidth
          variant="light">Back</Button>
      </Link>
        <ApplyJobComp/>

      </div>
    );
  }
  
  export default ApplyJobPage;