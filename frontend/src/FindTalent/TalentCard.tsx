import { IconHeart, IconMapPin  } from '@tabler/icons-react'
import { Avatar, Button, Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function TalentCard(props: any) {
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
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">{props.expectedCtc}</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {props.location}
          </div>
        </div>
        <Divider size="xs" color="mineShaft.7" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
          <Link to="/talent-profile">
            <Button color="brightSun.4" fullWidth variant="outline">
              Profile
            </Button>
          </Link>
          <div>
            <Button color="brightSun.4" fullWidth variant="light">
              Message
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default TalentCard;
  