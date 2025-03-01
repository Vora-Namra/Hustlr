import { ActionIcon} from "@mantine/core";
import { IconBriefcase, IconCheck, IconPencil, IconX, IconMapPin, IconUserPin } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { NumberInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const select = fields;
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  // Include totalExp in the form initial values
  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '', location: '', totalExp: 0 },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        'jobTitle': profile.jobTitle,
        'company': profile.company,
        'location': profile.location,
        'totalExp': profile.totalExp || 0,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Updated Successfully.");
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "brightSun.4"} variant="subtle">
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput
              {...form.getInputProps("totalExp")}
              label="Total Experience (years)"
              hideControls
              clampBehavior="strict"
              placeholder="Enter total experience"
              withAsterisk
              min={1} max={40}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-md flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 text-sm mt-1 items-center ">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
          <div className="flex gap-1 text-sm mt-1 items-center ">
            <IconUserPin className="h-5 w-5" stroke={1.5} />
            {profile.totalExp ? `${profile.totalExp} years of experience` : "Experience not specified"}
          </div>
        </>
      )}
    </>
  );
};

export default Info;
