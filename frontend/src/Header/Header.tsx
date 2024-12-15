import React from 'react'
import {IconAsset, IconBell, IconSettings} from "@tabler/icons-react"
import { Avatar } from '@mantine/core'

function Header() {
  return (
    <div className='w-full bg-black px-6 text-white flex justify-between h-28 items-center'>
        <div className='flex gap-2 items-center'>
            <IconAsset className='h-10 w-10' stroke={1.25}/>
            <div className='text-2xl font-semibold'>Hustlr</div>
            
        </div>
        <div className='flex gap-10 items-center text-lg'>
            <a href="">Find Job</a>
            <a href="">Find Talent</a>
            <a href="">Uplaod jobs</a> 
            <a href="">About Us</a>
        </div>
        <div className='flex gap-8 items-center'>
            <IconBell/>
            <div className='flex items-center gap-2'>
              <div>John</div>
              <Avatar src="avatar.png" alt="it's me"/>
            </div>
            <IconSettings/>
        </div>

    </div>
  )
}

export default Header