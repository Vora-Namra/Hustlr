import { ActionIcon } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form"; // <-- Import useForm from Mantine
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state:any)=>state.user);
  const select = fields;
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state:any)=>state.profile)
  
  // Initialize the form using Mantine's useForm hook
  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '', location: '' },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({jobTitle:profile.jobTitle,company:profile.company,location:profile.location});
    } else {
      setEdit(false);
      let updatedProfile = {...profile,...form.getValues()};
      dispatch(changeProfile(updatedProfile));
      successNotification("Success","Profile Updated Successfully.")
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <ActionIcon onClick={handleClick} size="lg" color="brightSun.4" variant="subtle">
          {edit ? (
            <IconDeviceFloppy className="h-4/5 w-4/5" />
          ) : (
            <IconPencil className="h-4/5 w-4/5" />
          )}
        </ActionIcon>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput {...select[1]} name="company" form={form} />
          </div>
          <SelectInput {...select[2]} name="location" form={form}/>
        </>
      ) : (
        <>
          <div className="text-md flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
        </>
      )}
    </>
  );
};

export default Info;
