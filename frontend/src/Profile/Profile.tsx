
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Indicator,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import fields from "../Data/Profile";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Certification from "./Certification";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";

function Profile(props: any) {
  const dispatch = useDispatch();
  const select = fields;
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state:any)=>state.profile);
  
  const [edit, setEdit] = useState([false, false, false, false, false]);

  const [error, setError] = useState("");


  const handleFileChange = async (image: any) => {
    let picture: string = await getBase64(image) as string;
    let updatedProfile = { ...profile, picture: picture.split(',')[1] };
    dispatch(setProfile(updatedProfile));
    successNotification("Success", "Profile Picture Updated Successfully.");

    // Update the profile in the backend
    try {
        await updateProfile(updatedProfile);
    } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again later.");
    }
};


  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
  const getBase64=(file:any)=>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>resolve(reader.result);
        reader.onerror=error=>reject(error);
    })
  }
 
  useEffect(() => {
    if (user.profileId) {  // Use the profileId from the user object
      getProfile(user.profileId)
        .then((data: any) => {
            dispatch(setProfile(data));
        })
        .catch((err: any) => {
          console.error("Error fetching profile:", err.response?.data || err.message);
          setError("Failed to fetch profile data. Please try again later.");
        });
    } else {
      setError("Invalid profile ID.");
    }
  }, [user.profileId]);
  
 
const { hovered, ref } = useHover();
  return (
    <>
    <div className="w-4/5 mx-auto bg-mine-shaft-950">
      <div>
      <div className="relative">
        <img
          className="rounded-t-2xl mt-5"
          src="/banner.jpg"
          alt="Background"
        />
        <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
        {/* <Indicator className="[&_.mantine-Indicator-indicator]:!border-4 [&_img]:hover:opacity-80" autoContrast inline offset={30} label={<IconPencil className="w-4/5 h-4/5"/>} size={45} position="bottom-end" color="brightSun.4" withBorder> */}

        <Avatar className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full" 
        src={profile.picture? `data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt=""/>   

        {hovered && <Overlay color="#000" className="!rounded-full" backgroundOpacity={0.75}/>}

        {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16"/>}

       {hovered && <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full" variant="transparent" size="lg" radius="xl" accept="image/png,image/jpeg" />}
        
        {/* </Indicator> */}
      </div>
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
    </div>
    </>
    
  );
}

export default Profile;
