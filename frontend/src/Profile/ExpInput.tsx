import { Anchor, Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput"
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

export const ExpInput=(props:any)=>{
    const select=fields;
    const [startDate,setStartDate] =useState<Date |null>(new  Date())
    const [endDate,setEndDate] =useState<Date |null>(null)
    const [checked,setChecked]=useState(false)
    const [desc,setDesc]=useState('ABC')
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">{props.edit?"Add":"Edit"} Experience</div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[0]} />
          <SelectInput {...select[1]} />
        </div> 
          <SelectInput {...select[2]} />
          <Textarea withAsterisk label="Summary" placeholder="Enter Summary" autosize minRows={3} value={desc} onChange={(event) => setDesc(event.currentTarget.value)}/>
          <div className="flex gap-10 [&>*]:w-1/2">
          <MonthPickerInput withAsterisk maxDate={new Date()||undefined}
      label="Start Date"
      placeholder="Pick date"
      value={startDate}
      onChange={setStartDate}
    />
    <MonthPickerInput disabled={checked} withAsterisk minDate={startDate||undefined} maxDate={new Date()||undefined}
      label="End Date"
      placeholder="Pick date"
      value={endDate}
      onChange={setEndDate}
    />
    
    <Checkbox checked={checked} onChange={(event)=>setChecked(event.currentTarget.checked)} autoContrast  label="Currently working here"/></div>
    <div className="flex gap-5">
              <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
              <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
            </div>
            </div>
}

