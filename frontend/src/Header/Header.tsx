import React, { useEffect } from 'react'
import {IconAsset, IconBell, IconSettings} from "@tabler/icons-react"
import { Avatar, Button, Indicator, NavLink } from '@mantine/core'
import NavLinks from './NavLinks'
import { Link, useLocation } from 'react-router-dom'
import { ProfileMenu } from './ProfileMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Services/ProfileService'
import { setProfile } from '../Slices/ProfileSlice'

function Header() {
  const location=useLocation();
  const user = useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    getProfile(user.profileId).then((res)=>{
      dispatch(setProfile(res));
    }).catch((err)=>{throw err});
  },[])
  return location.pathname!="/signup"&& location.pathname!="/login"? (
    <div className='w-full bg-mine-shaft-950 px-6 text-white flex justify-between h-20 items-center '>
        <div className='flex gap-2 items-center  text-bright-sun-400 ml-6'>
            <IconAsset className='h-12 w-12' stroke={2}/>
            <div className='text-2xl font-semibold'>Hustlr</div>
            
        </div>
        <NavLinks/>
        <div className='flex gap-8 items-center justify-between mr-6'>
            {user ? <ProfileMenu/>: <Link to="/login">
            <Button variant='subtle' color='brightSun.4'>Login</Button></Link>}
            {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'> */}
            {/* <IconSettings stroke={1.5} /> */}
            {/* </div> */}
            <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
            <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5}/>
            </Indicator>
            </div>
        </div>

    </div>
  ):<div></div>
}

export default Header