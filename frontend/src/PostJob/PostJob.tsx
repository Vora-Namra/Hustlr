import SelectInput from "./SelectInput";
import {content, fields} from "../Data/PostJob";
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob=()=> {
    const { id } = useParams();
    const [editorData, setEditorData] = useState(content);
    interface RootState {
        user: {
            id: string;
            // Add other user properties here
        };
    }
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const select=fields;
    useEffect(()=>{
        window.scrollTo(0,0);
        if(id && id !== "0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            form.reset();
            setEditorData(content);
        }
    },[id])
    const form = useForm({
        mode:"controlled",
        validateInputOnChange:true,
        initialValues:{
            jobTitle:'',
            company:'',
            experience:'',
            jobType:'',
            location:'',
            packageOffered:'',
            skillsRequired: [],
            about:'',
            description:content


        },
        validate:{
            jobTitle:isNotEmpty("Title foeld is required"),
            company:isNotEmpty('Company is required'),
            experience:isNotEmpty('Experience is required'),
            jobType:isNotEmpty("Job Type is Required"),
            location:isNotEmpty('Location is required'),
            packageOffered:isNotEmpty('Package Offered is required'),
            skillsRequired:isNotEmpty('Skills Required is required'),
            about:isNotEmpty('About is required'),
            description:isNotEmpty('Description is required'),

        }
    });
    
    const handlePost = async () => {
        const isValid = form.validate();
        if (!isValid.hasErrors) {
            try {
                const jobData = {
                    ...form.values,
                    id: id || "0",
                    postedBy: user.id,
                    jobStatus: "ACTIVE",
                    title: form.values.jobTitle,
                    salary: Number(form.values.packageOffered)
                };
                
                const res = await postJob(jobData);
                successNotification("Success", "Job Posted Successfully");
                navigate(`/posted-job/${res.id}`);
            } catch (err: unknown) {
                console.error(err);
                errorNotification(
                    "Failed", 
                    (err as any)?.response?.data?.message || "Failed to post job"
                );
            }
        }
    };
    
    const handleDraft = async () => {
        const isValid = form.validate();
        if (!isValid.hasErrors) {
            try {
                const jobData = {
                    ...form.values,
                    id: id || "0",
                    title: form.values.jobTitle,
                    salary: Number(form.values.packageOffered),
                    jobStatus: "DRAFT",
                    description: editorData
                };
                
                const res = await postJob(jobData);
                successNotification("Success", "Job Drafted Successfully");
                navigate(`/posted-job/${res.id}`);
            } catch (err: unknown) {
                console.error(err);
                errorNotification(
                    "Failed", 
                    err.response?.data?.message || "Failed to save draft"
                );
            }
        }
    };
    
        return <div className="w-4/5 mx-auto">
           <div className="text-2xl font-semibold mb-5">Post a Job</div>
           <div className="flex flex-col gap-5">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="jobTitle" {...select[0]}/>
                    <SelectInput form={form} name="company" {...select[1]}/>
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="experience" {...select[2]}/>
                    <SelectInput form={form} name="jobType" {...select[3]}/>
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <SelectInput form={form} name="location" {...select[4]}/>
                    <NumberInput {...form.getInputProps('packageOffered')} label="salary" withAsterisk min={1} clampBehavior="strict" max={300} placeholder="Enter Salary in Lakhs" hideControls/>
                </div>
                <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter skill" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />
            <Textarea
                    {...form.getInputProps("about")}
                    withAsterisk
                    label="About"
                    placeholder="Enter About job...."
                    autosize
                    minRows={3}
                  />
            <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20" >
                <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
                <TextEditor form={form} data={editorData}/>
            </div>
            <div className="flex gap-4">
            <Button color="brightSun.4" onClick={handlePost}  variant="light">Publish Job</Button>
            <Button color="brightSun.4" onClick={handleDraft} variant="outline">Save as Draft</Button>
            </div>
       </div>
    </div>
    
}
export default PostJob;        