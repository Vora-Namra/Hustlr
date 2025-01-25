import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react";
import { Link } from "react-router-dom"
import { registerUser } from "../Services/UserServices";


const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
}

export const SignUp=()=>{

  const [data,setData] = useState(form);

  const handleChange = (event: any) => {
    // Check if event is a string (from radio group) or a target element (for text inputs)
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  

const handleSubmit=()=>{
  registerUser(data).then((res)=>{
    console.log(res);
  }).catch((err)=>console.log(err))
}

    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput onChange={handleChange} name="name" value={data.name} withAsterisk label="Full Name" placeholder="Your name"/>
      <TextInput  onChange={handleChange} name="email" value={data.email}withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"/>
      <PasswordInput onChange={handleChange} name="password" value={data.password} withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
      <PasswordInput onChange={handleChange} name="confirmPassword" value={data.confirmPassword} withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />

      <Radio.Group
      value={data.accountType}
      onChange={handleChange}
      label="You Are?"
      description="This is anonymous"
      withAsterisk
    >
      <Group mt="xs">
      <Radio  className="py-4 px-6 border has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg" value="APPLICANT" label="APPLICANT" />
      <Radio  className="py-4 px-6 border has-[:checked]:border-bright-sun-400  hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg" value="EMPLOYER" label="EMPLOYER" />
      </Group>
    </Radio.Group>
      <Checkbox autoContrast  label={<>I agree{'  '}<Anchor>terms & conditions</Anchor></>}/>
      <Button onClick={handleSubmit}  variant="filled">Sign Up</Button>
      <div className="mx-auto">Have an account already? <Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
}

// import { Anchor, Button, Checkbox, PasswordInput, rem, TextInput } from "@mantine/core"
// import { IconAt, IconLock } from "@tabler/icons-react"
// import { Link, useLocation } from "react-router-dom"

// export const SignUp=()=>{
//   const location=useLocation()
//     return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
//         <div className="text-2xl font-semibold">Create Account</div>
//         <TextInput withAsterisk label="Full Name" placeholder="Your name"/>
//       <TextInput withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"/>
//       <PasswordInput withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
//       <PasswordInput withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
//       <Checkbox autoContrast  label={<>I agree{'  '}<Anchor>terms & conditions</Anchor></>}/>
//       <Button autoContrast variant="filled">Sign Up</Button>
//       <div className="mx-auto">Have an account already? <Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
//     </div>
// }