import { Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"

export const Company=()=>{
    return <div>
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
            <img className="w-48 h-48 border-mine-shaft-950 border-8 absolute -bottom-1/3 left-3 rounded-full" src="/Avatar.png" alt=""/>
        </div>
        <div className="px-3 mt-16">
            <div className="text-3xl font-semibold flex justify-between">Jarred Wood <Button color="brightSun.4" variant="Light">Message</Button>
            </div>
        <div className="text-xl flex gap-1 items-center"> <IconBriefcase className="h-5 w-5" stroke={1.5} />Software Engineer &bull; Google</div>
        <div className="text-xl flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="h-5  w-5" stroke={1.5}/>New York, United States
        </div>
        <Divider my="xl"/>
        </div>
    </div>
}