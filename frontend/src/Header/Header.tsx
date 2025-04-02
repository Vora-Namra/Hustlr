
import React, { useEffect, useState } from 'react'
import { IconAsset, IconBell, IconMenu2 } from "@tabler/icons-react"
import { Avatar, Burger, Button, Drawer, Indicator } from '@mantine/core'
import NavLinks from './NavLinks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ProfileMenu } from './ProfileMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Services/ProfileService'
import { setProfile } from '../Slices/ProfileSlice'
import NotificationMenu from './NotificationMenu'
import { jwtDecode } from 'jwt-decode'
import { setUser } from '../Slices/UserSlice'
import { setupResponseInterceptor } from '../Interceptor/AuthInterceptor'
import { useDisclosure } from '@mantine/hooks'

function Header() {
  // const [opened, {open,close}] = useDisclosure(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state:any)=>state.jwt);
  useEffect(()=>{
    setupResponseInterceptor(navigate,dispatch);
    
  },[navigate])

  useEffect(() => {
    if(token != ""){
      const decoded = jwtDecode(localStorage.getItem("token")||"");
      dispatch(setUser({...decoded,email:decoded.sub}));
    }
    if (user && user.profileId) {
      getProfile(user.profileId)
        .then((res) => {
          dispatch(setProfile(res));
        })
        .catch((err) => { throw err });
    }
  }, [token,navigate])

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return <div></div>;
  }
 return (
    <div className='w-full bg-mine-shaft-950 px-3 md:px-6 text-white flex justify-between h-20 items-center'>
      {/* Logo Section */}
      <div className='flex gap-2 items-center text-bright-sun-400 ml-2 md:ml-6'>
        <IconAsset className='h-8 w-8 md:h-12 md:w-12' stroke={2} />
        <div className=' xs-mx:hidden text-2xl font-semibold'>Hustlr</div>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden bs:block'>
        <NavLinks />
      </div>

      {/* Right Section */}
      <div className='flex gap-4 md:gap-8 items-center justify-between mr-2 md:mr-6'>
        {user ? (
          <div >
            <ProfileMenu />
          </div>
        ) : (
          <Link to="/login">
            <div className='hidden xs-mx:block'>
            <Button variant='subtle' color='brightSun.4' size='sm' className='hidden xs-mx:block'>
              Login
            </Button>
            </div>
          </Link>
        )}
        {user?<NotificationMenu/>:<></>}
        {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} className='h-5 w-5 md:h-6 md:w-6' />
          </Indicator>
        </div> */}



        {/* Mobile Menu Button */}
        <div className='bs:hidden'>
        <Button
          variant='subtle'
          onClick={() => setMobileMenuOpen(true)}
        >
          <IconMenu2 className='h-6 w-6' />
        </Button>
        </div>
        
      </div>

      {/* { <Burger opened={opened} onClick={open} aria-label="Toggle menu" /> } */}

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        size="xs"
        position="right"
        title="Menu"
      >
        <div className='flex flex-col gap-4'>
          <div className='mb-4'>
            {user ? <ProfileMenu /> : (
              <Link to="/login">
                <Button variant='subtle' color='brightSun.4' fullWidth>
                  Login
                </Button>
              </Link>
            )}
          </div>
          <NavLinks isMobile={true} onClose={() => setMobileMenuOpen(false)} />
        </div>
      </Drawer>
    </div>
 )
}

export default Header
