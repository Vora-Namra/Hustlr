import { Button, Divider, FileInput, NumberInput, rem, Textarea, TextInput,Notification, LoadingOverlay } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApplicationForm from "./ApplicationForm"
import { timeAgo } from "../Services/Utilities"

export const ApplyJobComp=(props:any)=>{
    const [preview,setPreview]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [sec,setSec]=useState(5)
    const navigate= useNavigate()

    const handlePreview=()=>{
        setPreview(!preview)
        window.scrollTo({top:0,behavior:'smooth'})
    }
    const handleSubmit=()=>{
        setSubmit(true)
        let x=5
        setInterval(()=>{
            x--
            setSec(x)
            if(x==0)navigate('/find-jobs')
        },1000)
    }
    return <div className="w-2/3 mx-auto">
               

        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='p-3 bg-mine-shaft-800 rounded-xl'>
                    <img className='h-14' src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className='font-semibold text-2xl'>{props.jobTitle}</div>
                    <div className='text-lg text-mine-shaft-300'>{props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants?props.applicants.length:0} Applicants Applied</div>
                </div>
            </div>
        </div>
        <Divider my="xl"/>
        <ApplicationForm/>
       
    </div>
   
  
}