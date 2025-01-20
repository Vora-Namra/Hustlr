import { Button, TextInput } from "@mantine/core"
import SelectInput from "./SelectInput"
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

export const CertiInput = (props: any) => {
    const select = fields;
    const [issueDate,setIssueDate] =useState<Date |null>(new  Date())
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificates</div>
        <div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput label="Title" withAsterisk placeholder="Enter title" />
                <SelectInput {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
            <MonthPickerInput withAsterisk maxDate={new Date()}
                  label="Issue Date"
                  placeholder="Pick date"
                  value={issueDate}
                  onChange={setIssueDate}
                />
                <TextInput label="Certificate ID" withAsterisk placeholder="Enter ID" />
            </div>
            
            <div className="flex gap-5">
                <Button onClick={() => props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
            </div>
        </div>
    </div>
}