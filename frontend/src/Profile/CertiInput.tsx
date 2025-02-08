import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

export const CertiInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is Required"),
      issuer: isNotEmpty("Issuer is Required"),
      issueDate: isNotEmpty("Issue Date is Required"),
      certificateId: isNotEmpty("Certificate ID is Required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let certi = [...profile.certifications]; // Get existing certifications
    let newCerti = { ...form.getValues(), issueDate: form.values.issueDate.toISOString() };

    certi.push(newCerti); // Add new certification
    let updatedProfile = { ...profile, certifications: certi }; // Corrected state update

    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate Added Successfully");
    props.setEdit(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter title" />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          {...form.getInputProps("issueDate")}
          placeholder="Pick date"
        />
        <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID" />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
      </div>
    </div>
  );
};
