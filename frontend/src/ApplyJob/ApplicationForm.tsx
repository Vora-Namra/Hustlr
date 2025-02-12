import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBase64 } from "../Services/Utilities"
import { applyJob } from "../Services/JobService"
import { errorNotification, successNotification } from "../Services/NotificationService"
import { useSelector } from "react-redux"

const ApplicationForm=()=>{
  const {id} =useParams();
    const [preview,setPreview]=useState(false)
    const [submit,setSubmit]=useState(false)
    const navigate= useNavigate();
    const user = useSelector((state:any)=>state.user);

    const handlePreview=()=>{
        form.validate();
        window.scrollTo({top:0,behavior:'smooth'});
        if(!form.isValid())return;
        setPreview(!preview)
    }
    const handleSubmit = async () => {
      try {
        setSubmit(true);
        const resumeData: any = await getBase64(form.getValues().resume);
        const applicant = {
          ...form.getValues(),
          applicantId: user.id,
          resume: resumeData.split(",")[1],
        };
        await applyJob(id, applicant);
        successNotification("Success", "Application Submitted Successfully");
        navigate("/job-history");
      } catch (err: any) {
        errorNotification("Failed", err.response?.data?.errorMessage || "Application Already failed");
      } finally {
        setSubmit(false);
      }
    };
    

            const form = useForm({
                mode: "controlled",
                validateInputOnChange: true,
                initialValues: {
                name: "",
                email: "",
                phone: "",
                website: "",
                resume:null,
                coverLetter:""
                },
                validate: {
                name: isNotEmpty("Name is Required"),
                email: isNotEmpty("email is Required"),
                phone: isNotEmpty("Phone Date is Required"),
                website: isNotEmpty("Website ID is Required"),
                resume: isNotEmpty("Resume ID is Required"),

                },
            });
    return <>
             <LoadingOverlay className="!fixed"
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
    
         <div className="text-xl font-semibold mb-5">Submit Your Application</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} label="Full Name" placeholder="Enter Name" withAsterisk/>
            <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} label="Email" placeholder="Enter Email" withAsterisk/>
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
            <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} label="Phone Number" placeholder="Enter Phone Number" withAsterisk hideControls min={0} max={9999999999} clampBehavior="strict"/>
            <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} label="Personal Website" placeholder="Enter Url" withAsterisk/>
            </div>
            <FileInput accept="application/pdf" {...form.getInputProps("resume")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk
        leftSection={<IconPaperclip stroke={1.5}/>}
        label="Attach your CV"
        placeholder="Your CV"
        leftSectionPointerEvents="none"
      />
      <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk
        placeholder="Type something about yourself..."
        label="Cover Letter"
        autosize
        minRows={4}
      />
      {!preview &&<Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>}
      {
        preview && <div className="flex gap-10 [&>*]:w-1/2">
            <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
            <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
        </div>
      }
        </div>
    
    </>
}

export default ApplicationForm;