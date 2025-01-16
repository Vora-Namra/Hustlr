import { Avatar, Button, Divider, Tabs } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import { AboutComp } from "./AboutComp"

export const Company=()=>{
    return <div className="w-3/4">
        <div className="relative">
            <img className="rounded-t-2xl" src="/banner.jpg" alt="" />
            <img className="bg-mine-shaft-950 w-36 h-36 p-2 border-mine-shaft-950 border-8 absolute -bottom-1/4 left-5 rounded-3xl" src="/Icons/Google.png" alt=""/>
        </div>
        <div className="px-3 mt-12">
            <div className="text-3xl font-semibold flex justify-between">Google <Avatar.Group>
      <Avatar src="avatar1.png" />
      <Avatar src="avatar2.png" />
      <Avatar src="avatar.png" />
      <Avatar>+10K</Avatar>
    </Avatar.Group>
            </div>
        <div className="text-xl flex gap-1 items-center"> <IconBriefcase className="h-5 w-5" stroke={1.5} />Software Engineer &bull; Google</div>
        <div className="text-xl flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="h-5  w-5" stroke={1.5}/>New York, United States
        </div>
        <Divider my="xl"/>
        <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
      <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
        <Tabs.Tab value="employees">Employees</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
      <Tabs.Panel value="jobs">Second panel</Tabs.Panel>
      <Tabs.Panel value="employees">Emps</Tabs.Panel>
    </Tabs>
        </div>
        </div>
    </div>
}