import {
  ActionIcon,
  Button,
  Divider,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpCard from "./ExpCard";
import { CertiInput } from "./CertiInput";
import { getProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";

function Profile(props: any) {
  const dispatch = useDispatch();
  const select = fields;
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state:any)=>state.profile);
  const [skill, setSkill] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "SpringBoot",
    "HTML",
    "CSS",
    "MongoDb",
    "MySql",
    "Express",
  ]);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [error, setError] = useState("");
  const [about, setAbout] = useState(`As a Software Engineer at Google, I specialize in building scalable
    and high-performance applications. My expertise lies in integrating front-end and back-end technologies to
    deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB
    for database solutions, I am passionate about leveraging the latest technologies to solve complex problems
    and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs
    effectively.`);
    

  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
 
  useEffect(() => {
    if (user.profileId) {  // Use the profileId from the user object
      getProfile(user.profileId)
        .then((data: any) => {
            dispatch(setProfile(data));
          // Optionally update your state with the fetched profile data
        })
        .catch((err: any) => {
          console.error("Error fetching profile:", err.response?.data || err.message);
          setError("Failed to fetch profile data. Please try again later.");
        });
    } else {
      setError("Invalid profile ID.");
    }
  }, [user.profileId]);
  


  return (
    <>
    <div className="w-4/5 mx-auto bg-mine-shaft-950">
      {error && <div className="text-red-500">{error}</div>}
      <div className="relative">
        <img
          className="rounded-t-2xl mt-5"
          src="/banner.jpg"
          alt="Background"
        />
        <img
          className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="/avatar.png"
          alt="Avatar"
        />
      </div>

      {/* Name Section */}
      <div className="px-3 mt-20">
        <Info/>
      </div>
      <Divider size="xs" my="md" color="mineShaft.7" />

      {/* About Section */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About{" "}
          <ActionIcon
            onClick={() => handleEdit(1)}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            {edit[1] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[1] ? (
          <Textarea
            autosize
            minRows={3}
            placeholder="Enter about yourself"
            value={about}
            onChange={(event) => setAbout(event.currentTarget.value)}
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {profile?.about}
          </div>
        )}
      </div>
      <Divider my="md" color="mineShaft.7" />

       {/* Skills Section */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills{" "}
          <ActionIcon
            onClick={() => handleEdit(2)}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            {edit[2] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[2] ? (
          <TagsInput
            value={skill}
            onChange={setSkill}
            label="Press Enter to submit a tag"
            placeholder="Add skill"
            splitChars={[",", " ", "|"]}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.map((s: string, index: number) => (
              <div
                key={index}
                className="bg-bright-sun-400 text-sm font-semibold bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <Divider my="md" color="mineShaft.7" />

      {/* Experience Section */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => handleEdit(3)}
              size="lg"
              color="brightSun.4"
              variant="subtle"
            >
              <IconPlus className="h-4/5 w-4/5" />
            </ActionIcon>
            <ActionIcon
              onClick={() => setAddExp(true)}
              size="lg"
              color="brightSun.4"
              variant="subtle"
            >
              {edit[3] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          
           {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard key={index} {...exp} edit={edit[3]} />
          ))} 
          {addExp && <ExpCard add setEdit={setAddExp} />}
        </div>
      </div>

      <Divider my="md" color="mineShaft.7" />


      {/* Certifications Section */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-2 flex justify-between">
          Certifications
          <ActionIcon
            onClick={() => setAddCerti(true)}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
        </div>
        <div className="flex flex-col gap-4">
           {profile?.certifications?.map((certi: any, index: any) => (
            <CertiCard key={index} edit={edit[4]} {...certi} />
          ))} 
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
        
      </div>

      
    </div>
    </>
    
  );
}

export default Profile;
