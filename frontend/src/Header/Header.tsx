import React, { useEffect, useState } from 'react'
import { IconAsset, IconBell, IconMenu2 } from "@tabler/icons-react"
import { Avatar, Button, Drawer, Indicator } from '@mantine/core'
import NavLinks from './NavLinks'
import { Link, useLocation } from 'react-router-dom'
import { ProfileMenu } from './ProfileMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Services/ProfileService'
import { setProfile } from '../Slices/ProfileSlice'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.profileId) {
      getProfile(user.profileId)
        .then((res) => {
          dispatch(setProfile(res));
        })
        .catch((err) => { throw err });
    }
  }, [user])

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return <div></div>;
  }
 return (
    <div className='w-full bg-mine-shaft-950 px-3 md:px-6 text-white flex justify-between h-20 items-center'>
      {/* Logo Section */}
      <div className='flex gap-2 items-center text-bright-sun-400 ml-2 md:ml-6'>
        <IconAsset className='h-8 w-8 md:h-12 md:w-12' stroke={2} />
        <div className='text-xl md:text-2xl font-semibold'>Hustlr</div>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:block'>
        <NavLinks />
      </div>

      {/* Right Section */}
      <div className='flex gap-4 md:gap-8 items-center justify-between mr-2 md:mr-6'>
        {user ? (
          <div className='hidden md:block'>
            <ProfileMenu />
          </div>
        ) : (
          <Link to="/login">
            <Button variant='subtle' color='brightSun.4' size='sm' className='hidden md:block'>
              Login
            </Button>
          </Link>
        )}

        <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} className='h-5 w-5 md:h-6 md:w-6' />
          </Indicator>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant='subtle'
          className='md:hidden'
          onClick={() => setMobileMenuOpen(true)}
        >
          <IconMenu2 className='h-6 w-6' />
        </Button>
      </div>

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