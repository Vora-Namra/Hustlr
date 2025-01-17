import { Divider } from "@mantine/core"
import { IconAnchor } from "@tabler/icons-react"
import { SignUp } from "../SignUpLogin/SignUp"

export const SignUpPage=()=>{
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="w-[100vw] h-[100vh] flex">
        <div className="w-1/2 h-full rounded-r-[200px] bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col">
        <div className='flex gap-1 items-center text-bright-sun-400 ml-6'>
            <IconAnchor className='h-16 w-16' stroke={2}/>
            <div className='text-6xl font-semibold'>Hustlr</div>
        </div>
        <div className="text-2xl text-mine-shaft-200 font-semibold">Find Your Dream Job</div>
        </div>
        <SignUp/>
      </div>
</div>
}