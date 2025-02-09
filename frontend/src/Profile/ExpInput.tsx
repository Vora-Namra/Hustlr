
import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

export const ExpInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [checked, setChecked] = useState(props.working || false);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: props.title || "",
      company: props.company || "",
      location: props.location || "",
      description: props.description || "",
      startDate: props.startDate ? new Date(props.startDate) : new Date(),
      endDate: props.endDate ? new Date(props.endDate) : new Date(),
      working: props.working || false,
    },
    validate: {
      title: isNotEmpty("Title is Required"),
      company: isNotEmpty("Company is Required"),
      location: isNotEmpty("Location is Required"),
      description: isNotEmpty("Description is Required"),
    },
  });

  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title || "",
        company: props.company || "",
        location: props.location || "",
        description: props.description || "", // Ensure description is set properly
        startDate: props.startDate ? new Date(props.startDate) : new Date(),
        endDate: props.endDate ? new Date(props.endDate) : new Date(),
        working: props.working || false,
      });
      setChecked(props.working || false);
    }
  }, [props]);

  // **Handle Save**
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let updatedExperience = {
      title: form.values.title,
      company: form.values.company,
      location: form.values.location,
      description: form.values.description, // Use form.values instead of separate state
      startDate: form.values.startDate.toISOString(),
      endDate: checked ? null : form.values.endDate.toISOString(),
      working: checked,
    };

    let exp = [...profile.experiences];

    if (props.add) {
      exp.push(updatedExperience); // Add new experience
    } else {
      exp[props.index] = updatedExperience; // Update existing experience
    }

    let updatedProfile = { ...profile, experiences: exp };

    dispatch(changeProfile(updatedProfile));
    props.setEdit(false);
    successNotification("Success", `Experience ${props.add ? "Added" : "Updated"} Successfully`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      
      {/* FIXED: Bind Textarea directly to form.values.description */}
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        label="Summary"
        placeholder="Enter Summary"
        autosize
        minRows={3}
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          withAsterisk
          maxDate={new Date()}
          label="Start Date"
          placeholder="Pick date"
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          disabled={checked}
          withAsterisk
          minDate={form.values.startDate || undefined}
          maxDate={new Date()}
          label="End Date"
          placeholder="Pick date"
        />
      </div>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Currently working here"
      />
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};
