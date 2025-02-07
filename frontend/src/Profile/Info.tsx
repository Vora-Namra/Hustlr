import { ActionIcon } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form"; // <-- Import useForm from Mantine

const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  
  // Initialize the form using Mantine's useForm hook
  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '', location: '' },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      console.log(form.getValues());
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        NAME
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
            <SelectInput {...select[0]} />
            <SelectInput {...select[1]} />
          </div>
          <SelectInput {...select[2]} />
        </>
      ) : (
        <>
          <div className="text-md flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            Software Engineer &bull; COMPANY NAME
          </div>
          <div className="flex gap-1 text-sm mt-1 items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            NEW YORK, UNITED STATES
          </div>
        </>
      )}
    </>
  );
};

export default Info;
