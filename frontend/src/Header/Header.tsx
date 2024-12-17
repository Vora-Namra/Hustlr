import React from 'react'
import {IconAsset, IconBell, IconSettings} from "@tabler/icons-react"
import { Avatar, Indicator, NavLink } from '@mantine/core'
import NavLinks from './NavLinks'

function Header() {
  return (
    <div className='w-full bg-mine-shaft-950 px-6 text-white flex justify-between h-20 items-center '>
        <div className='flex gap-2 items-center text-bright-sun-400 ml-6'>
            <IconAsset className='h-12 w-12' stroke={2}/>
            <div className='text-2xl font-semibold'>Hustlr</div>
            
        </div>
        <NavLinks/>
        <div className='flex gap-8 items-center justify-between mr-6'>
          
            <div className='flex items-center gap-2 '>
              <div>John</div>
              <Avatar src="avatar.png" alt="it's me"/>
            </div>
            <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
            <IconSettings stroke={1.5} />
            </div>
            <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
            <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5}/>
            </Indicator>
            </div>
        </div>

    </div>
  )
}

export default Header