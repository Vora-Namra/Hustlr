import { Tabs } from "@mantine/core"
import { PostedJobCard } from "./PostedJobCard"
import { useEffect, useState } from "react"

export const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string>('ACTIVE');

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || 'ACTIVE');
  }, [props.job]);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value || 'ACTIVE');
  };

  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
        <Tabs autoContrast variant="pills" value={activeTab} onChange={handleTabChange}>
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-950 font-medium">
            <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE").length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT">Drafts [{props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT").length}]</Tabs.Tab>
            <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED").length}]</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="ACTIVE">
            <div className="flex flex-col gap-5 mt-5">
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE").map((item: any, index: any) => <PostedJobCard key={index} {...item} />)
              }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="DRAFT">
            <div className="flex flex-col gap-5 mt-5">
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT").map((item: any, index: any) => <PostedJobCard key={index} {...item} />)
              }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="CLOSED">
            <div className="flex flex-col gap-5 mt-5">
              {
                props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED").map((item: any, index: any) => <PostedJobCard key={index} {...item} />)
              }
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
