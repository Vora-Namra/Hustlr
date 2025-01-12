import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

function Profile(props: any) {
  return (
    <div className="w-2/3 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl mt-5" src="/banner.jpg" alt="Background" />
        <img
          className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="/avatar.png"
          alt="Avatar"
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">
          {props.name}
          <Button color="brightSun.4" variant="light">
            Messages
          </Button>
        </div>
        <div className="text-md flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} />
          {props.role} &bull; {props.company}
        </div>
        <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          {props.location || "Not specified"}
        </div>  
      </div>
      <Divider size="xs" my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{props.about || "No details provided."}</div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {props.skills.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-400 text-sm font-semibold bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        <div className="flex flex-col gap-8">
          {props.experience.map((exp: any, index: number) => (
            <ExpCard key={exp.id || index} {...exp} />
          ))}
        </div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3 mb-16">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        <div className="flex flex-col gap-8">
          {props.certifications.map((certi: any, index: number) => (
            <CertiCard key={certi.id || index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
