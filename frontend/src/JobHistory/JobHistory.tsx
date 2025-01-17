import { Tabs } from "@mantine/core"

export const JobHistory = () => {
    return <div className="">
        <div className="text-2xl font-semibold mb-5">Job History</div>
        <div>
            <Tabs variant="outline" radius="lg" defaultValue="applied">
                <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="applied">Applied</Tabs.Tab>
                    <Tabs.Tab value="saved">Saved</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                    <Tabs.Tab value="interviewing">Interviewing</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="applied">
                    g
                </Tabs.Panel>
                <Tabs.Panel value="saved">
                    g
                </Tabs.Panel>
                <Tabs.Panel value="offered">
                    g
                </Tabs.Panel>
                <Tabs.Panel value="interviewing">
                    g
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}