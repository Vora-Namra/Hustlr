import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { ActionIcon } from "@mantine/core";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { isEmail, hasLength } from "@mantine/form";

const Info = () => {
  const select = fields;
  
  // State to track edit mode
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => {
    if(!edit){
        setEdit(true);  // Toggle the edit mode
    }else{
        setEdit(false);
        console.log(form.getValues());

    }
  };

  const form = useForm({
    initialValues: { jobTitle: "", company: "",location:"" }
  });

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        NAME
        <ActionIcon onClick={handleEdit} size="lg" color="brightSun.4" variant="subtle">
          {edit ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
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
            Software Engineer &bull; Google
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
