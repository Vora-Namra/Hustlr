import { IconCalendarMonth, IconHeart, IconMapPin  } from '@tabler/icons-react'
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { DateInput, TimeInput } from '@mantine/dates';


function TalentCard(props: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const ref=useRef<HTMLInputElement>(null)
    return (
      <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-2 rounded-xl border border-transparent hover:border-bright-sun-400 transition-all duration-300">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-full">
              <Avatar className="" size="lg" src={`/${props.image}.png`} alt="" />
            </div>
            <div>
              <div className="font-semibold text-lg">{props.name}</div>
              <div className="text-sm">{props.role} &#x2022; {props.company}</div>
            </div>
          </div>
          <div>
            <IconHeart className="text-mine-shaft-300 pr-2 cursor-pointer" />
          </div>
        </div>
        <div className="gap-2 flex">
          {props.topskills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"
            >
              {skill}
            </div>
          ))}
        </div>
        <Text className="!text-xs !my-1 !text-mine-shaft-300 !text-justify" lineClamp={4}>
          {props.about}
        </Text>
        <Divider size="xs" color="mineShaft.7" />
        {
          props.invited?<div className='flex gap-1 text-mine-shaft-200 text-sm items-center' >
            <IconCalendarMonth stroke={1.5}/>Interview: August 27, 2024 10:00 AM
          </div>:<div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">{props.expectedCtc}</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {props.location}
          </div>
        </div>
        }
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">{props.expectedCtc}</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {props.location}
          </div>
        </div>
        <Divider size="xs" color="mineShaft.7" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {
          !props.invited &&<>
          <Link to="/talent-profile">
            <Button color="brightSun.4" fullWidth variant="outline">
              Profile
            </Button>
          </Link>
          <div>
            {props.posted? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5"/>} color="brightSun.4" fullWidth variant="light">Schedule
            </Button>: <Button color="brightSun.4" fullWidth variant="light">
              Message
            </Button>}
          </div>
          </>
        }
        {
          props.invited && <>
          <div>
          <Button color="brightSun.4" fullWidth variant="outline">Accept</Button>
          </div>
          <div>
          <Button color="brightSun.4" fullWidth variant="outline">Reject</Button>
          </div>
            </>
        }
        </div>
        <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
        <DateInput minDate={new Date()} value={value} onChange={setValue} label="Date" placeholder="Enter Date" />
        <TimeInput label="Time" ref={ref} onClick={()=>ref.current?.showPicker()}/>
        <Button color="brightSun.4" fullWidth variant="light">Schedule</Button>
        </div>
      </Modal>
      </div>
    );
  }
  
  export default TalentCard;
  