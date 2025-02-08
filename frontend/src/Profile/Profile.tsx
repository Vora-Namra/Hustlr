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
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Certification from "./Certification";

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
      <About/>
      
      <Divider my="md" color="mineShaft.7" />

       {/* Skills Section */}
      <Skills/>
      <Divider my="md" color="mineShaft.7" />

      {/* Experience Section */}
      <Experiences/>
      <Divider my="md" color="mineShaft.7" />


      {/* Certifications Section */}
      <Certification/>

      
    </div>
    </>
    
  );
}

export default Profile;
