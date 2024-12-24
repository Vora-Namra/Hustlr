import { IconBookmark, IconClockHour3 } from '@tabler/icons-react'
import { Divider, Text } from '@mantine/core';


function JobCard(props:any) {
  return (
    <div className='bg-mine-shaft-900 p-4 w-72 flex flex-col gap-2 rounded-xl'>
        
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='p-2 bg-mine-shaft-800 rounded-md'>
                    <img className='h-7' src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div>
                    <div className='font-semibold'>{props.jobTitle}</div>
                    <div className='text-sm'>{props.company} &#x2022; {props.applicants} Applicants</div>
                </div>
            </div>
            <div><IconBookmark className='text-mine-shaft-300 cursor-pointer'/></div>
        </div>
        <div className='mt-1 gap-2 flex [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'>
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className='!text-xs !my-1 !text-mine-shaft-300 !text-justify' lineClamp={4}>
            {props.description}
        </Text>
        <Divider size="xs" color='mineShaft.7'/>
        <div className='flex justify-between'>
            <div className='font-semibold text-mine-shaft-200'>&#8377;{props.package}</div>
            <div className='flex gap-1 text-xs items-center text-mine-shaft-400'>
                <IconClockHour3 className='h-5 w-5' stroke={1.5}/> 
                {props.postedDaysAgo} days ago </div>
        </div>

    </div>
  )
}

export default JobCard