import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";

function TalentProfilePage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" color="mineShaft.7" />
      <Link to="/find-talent" className="my-4 inline-block">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          fullWidth
          variant="light"
        >
          Back
        </Button>
      </Link>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex gap-5">
        <Profile {...profile} />
        <RecommendTalent/>
      </div>
    </div>
  );
}

export default TalentProfilePage;
