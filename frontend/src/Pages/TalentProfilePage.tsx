import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";

function TalentProfilePage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className="my-5 inline-block" to="/find-talent">
        <Button color="brightSun.4" leftSection={<IconArrowLeft size={20} />}
          fullWidth
          variant="light">Back</Button>
      </Link>
      <div className="flex gap-5">
        <Profile
        name={profile.name}
        role={profile.role}
        company={profile.company}
        location={profile.location}
        about={profile.about}
        skills={profile.skills}
        experience={profile.experience}
        certifications={profile.certifications}/>
        <RecommendTalent/>
      </div>
    </div>
  );
}

export default TalentProfilePage;