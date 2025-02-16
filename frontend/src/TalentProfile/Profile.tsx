import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";

function Profile(props: any) {
  const {id} =useParams();
  const [profile,setProfile]= useState<any>({});
  useEffect(()=>{
    window.scrollTo(0,0);
    getProfile(id).then((res)=>{
      setProfile(res);
    }).catch((err)=>{
      console.log("Error fetching profile:", err);
    })
  },[id])
  
  return (
    <div className="w-2/3 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl mt-5" src="/banner.jpg" alt="Background" />
        <img className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "avatar.png"} alt="Avatar"/>
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">{profile?.name}
          <Button color="brightSun.4" variant="light">
            Messages
          </Button>
        </div>
        <div className="text-md flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} />
          {profile?.jobTitle} &bull; {profile?.company}
        </div>
        <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          {profile?.location || "Not specified"}
        </div>  
      </div>
      <Divider size="xs" my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{profile?.about || "No details provided."}</div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: number) => (
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
          {profile?.experiences?.map((exp: any, index: number) => (
            <ExpCard key={exp.id || index} {...exp} edit={true} />
          ))}
        </div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3 mb-16">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: number) => (
            <CertiCard key={certi.id || index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
