import { TextInput, rem, PasswordInput,Button } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export const Login=()=>{
    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">Create Account</div>
    <TextInput withAsterisk label="Full Name" placeholder="Your name"/>
  <TextInput withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"/>
  <PasswordInput withAsterisk leftSection={ <IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
  <Button autoContrast variant="filled">Sign Up</Button>
  <div className="mx-auto">Don't have an account?<Link to="/signup" className="text-bright-sun-400 hover:underline"> SignUp</Link></div>
</div>
}