import { TextInput, rem, PasswordInput,Button } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useState } from "react";
import { loginUser } from "../Services/UserServices";




const form={
  email:"",
  password:"",
}

export const Login=()=>{

  
  const [data,setData] = useState(form);

  const handleChange = (event: any) => {
      setData({ ...data, [event.target.name]: event.target.value });
    
  };

  const handleSubmit=()=>{
    loginUser(data).then((res)=>{
      console.log(res);
    }).catch((err)=>console.log(err))
  }

    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">Create Account</div>
  <TextInput onChange={handleChange} name="email" value={data.email} withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"/>
  <PasswordInput  value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
  <Button onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
  <div className="mx-auto">Don't have an account?<Link to="/signup" className="text-bright-sun-400 hover:underline"> SignUp</Link></div>
</div>
}