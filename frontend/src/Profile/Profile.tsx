import { ActionIcon, Button, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconAdjustments, IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpCard from "./ExpCard";
import { CertiInput } from "./CertiInput";


function Profile(props: any) {
  const select=fields
  const [skill,setSkill]=useState(['JavaScript','React','Node.js'])
  const [edit, setEdit] = useState([false, false, false, false, false])
  const [about,setAbout] = useState('default value')
  const [addExp,setAddExp] = useState(false)
  const [addCerti,setAddCerti] = useState(false)
  const handleEdit = (index: any) => {
    const newEdit = [...edit]
    newEdit[index] = !newEdit[index]
    setEdit(newEdit)
  }
  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl mt-5" src="/banner.jpg" alt="Background" />
        <img className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="/avatar.png" alt="Avatar" />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">NAME <ActionIcon onClick={() => handleEdit(0)} size="lg" color="brightSun.4" variant="subtle">
          {edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon>
        </div>
        {
          edit[0]?<><div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[0]} />
          <SelectInput {...select[1]} />
        </div> 
          <SelectInput {...select[2]} /></>:<>
          <div className="text-md flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} />
          {props.role} &bull; COMPANY NAME
        </div>
        <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          NEW YORK, UNITED STATES
      </div>
          </>
        }
        </div>
      <Divider size="xs" my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">About <ActionIcon onClick={() => handleEdit(1)} size="lg" color="brightSun.4" variant="subtle">
          {edit[1] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon></div>
        {
          edit[1]?<Textarea autosize minRows={3} placeholder="Enter about yourself" value={about} onChange={(event) => setAbout(event.currentTarget.value)}/>
          : <div className="text-sm text-mine-shaft-300 text-justify">{"No details provided."}</div>

        }
        </div>
    

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <ActionIcon onClick={() => handleEdit(2)} size="lg" color="brightSun.4" variant="subtle">
          {edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon></div>
        {
          edit[2]?<TagsInput value={skill} onChange={setSkill} label="Press Enter to submit a tag" placeholder="Add skill" splitChars={[',', ' ', '|']}/>
          :<div className="flex flex-wrap gap-2">
          {props.skills.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-400 text-sm font-semibold bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
        }
        
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">Experience <div className="flex gap-2"> <ActionIcon onClick={() => handleEdit(3)} size="lg" color="brightSun.4" variant="subtle">
          <IconPlus className="h-4/5 w-4/5" />
        </ActionIcon> <ActionIcon onClick={() => setAddExp(true)} size="lg" color="brightSun.4" variant="subtle">
          {edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
          ABC
          {/* profile.experience.map((exp,index)=><ExpCard key{index} {...exp}={edit[3]}/>) */}
          {addExp&&<ExpCard add setEdit={setAddExp}/>}
        </div>
      </div>

      <Divider my="md" color="mineShaft.7" />

      <div className="px-3 mb-16">
        <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications<div className="flex gap-2"> <ActionIcon onClick={() => handleEdit(4)} size="lg" color="brightSun.4" variant="subtle">
          <IconPlus className="h-4/5 w-4/5" />
        </ActionIcon> <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="brightSun.4" variant="subtle">
          {edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
          XYZ
          {/* profile.certifications.map((certi,index)=><CertiCard key{index} edit={edit[4]} {...edit}/>) */}
          {
            addCerti&&<CertiInput setEdit={setAddCerti}/>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
