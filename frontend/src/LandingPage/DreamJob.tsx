import { Avatar, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'

function DreamJob() {
  return (
    <div className='flex items-center px-16'>
            <div className='flex flex-col w-[45%] gap-3'>
                 <div className='text-5xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400'>Find your <span>dream</span> <span> job </span> with us.</div>
                 <div className='text-lg   text-mine-shaft-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quam et a architecto fuga similique. Dolorem officia </div>
                 <div className='flex gap-3 mt-5'>
                  <TextInput className='bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100' variant='unstyle' label="Job Title" placeholder='Software Engineer'/>
                  <TextInput className='bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100' variant='unstyle' label="Job Type" placeholder='FullTime'/>
                  <div className='flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer'>
                      <IconSearch className='h-[75%] w-[75%]'/>
                  </div>
                 </div>
            </div>


            <div className='w-[50%] flex items-center justify-center'>
                <div className='w-[20-rem] relative'>
                  <img src="/main.png" alt="Men" />
                  <div className='absolute right-3 w-fit top-[50%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md'>
                    <div className='text-center text-mine-shaft-100 mb-1 text-sm'>10K+ got job</div>
                <Avatar.Group>
                  <Avatar src="avatar.png" />
                  <Avatar src="avatar.png" />
                  <Avatar src="avatar.png" />
                  <Avatar>+5</Avatar>
                </Avatar.Group>
                  </div>
                  <div className='absolute left-9 w-fit top-[30%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col'>
                    <div className='flex gap-2 items-center mb-2'>
                      <div className='w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg'> 
                        <img src="/Google1.png" alt="" />
                      </div>
                      <div className='text-sm text-mine-shaft-200'>
                        <div>Software Engineer</div>
                        <div className='text-sm'>New York</div>
                      </div>
                    </div>

                    <div className='flex gap-2 text-mine-shaft-200 text-xs justify-around'>
                      <span>1 day ago</span>
                      <span>113 Applicants</span>
                    </div>
                  </div>
                </div>
            </div>

    </div>
  )
}

export default DreamJob