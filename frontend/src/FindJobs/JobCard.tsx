import { IconBookmark, IconClockHour3 } from '@tabler/icons-react';
import { Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { timeAgo } from '../Services/Utilities';

function JobCard(props: any) {
  // Safely handle null/undefined applicants
//   const applicantsCount = props.applicants
//     ? Array.isArray(props.applicants)
//       ? props.applicants.length
//       : Object.keys(props.applicants).length
//     : 0; // Default to 0 if null/undefined

  return (
    <Link to={`/jobs/${props.id}`} className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-2 rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt={`${props.company} logo`}
              onError={(e) => {
                e.currentTarget.src = '/Icons/default.png';
              }}
            />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-sm">
              {props.company} &bull; {props.applicants?props.applicants.length:0} Applicants
            </div>
          </div>
        </div>
        <div>
          <IconBookmark className="text-mine-shaft-300 cursor-pointer" />
        </div>
      </div>

      <div className="mt-1 gap-2 flex [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text className="!text-xs !my-1 !text-mine-shaft-300 !text-justify" lineClamp={4}>
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />
          Posted {timeAgo(props.postTime)} 
        </div>
      </div>
    </Link>
  );
}

export default JobCard;