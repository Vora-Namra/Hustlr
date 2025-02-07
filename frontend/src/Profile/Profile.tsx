import {
  ActionIcon,
  Button,
  Divider,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconAdjustments,
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
import { useSelector } from "react-redux";
import CertiCard from "./CertiCard";

function Profile(props: any) {
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
    console.log(profile);
    if (user.profileId) {  // Use the profileId from the user object
      getProfile(user.profileId)
        .then((data: any) => {
          console.log(data);
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
        <div className="text-3xl font-semibold flex justify-between">
          NAME
          <ActionIcon
            onClick={() => handleEdit(0)}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            {edit[0] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <div className="text-md flex gap-1 items-center">
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {props.role} &bull; COMPANY NAME
            </div>
            <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              NEW YORK, UNITED STATES
            </div>
          </>
        )}
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
            No details provided.
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
            {profile?.skills?.map((skill: any, index: number) => (
              <div
                key={index}
                className="bg-bright-sun-400 text-sm font-semibold bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
              >
                {skill}
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
          
           {profile?.experience?.map((exp: any, index: any) => (
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
        <div className="flex flex-col gap-8">
          XYZ
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
