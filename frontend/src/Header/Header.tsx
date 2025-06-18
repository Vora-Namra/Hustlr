// src/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import { IconAsset, IconMenu2 } from "@tabler/icons-react";
import { Avatar, Button, Drawer } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { getProfile } from '../Services/ProfileService';

import NavLinks from './NavLinks';
import { ProfileMenu } from './ProfileMenu';
import NotificationMenu from './NotificationMenu';

import axiosInstance, { setupResponseInterceptor } from '../Interceptor/AuthInterceptor';
import { setUser, removeUser } from '../Slices/UserSlice';
import { setJwt, removeJwt } from '../Slices/JwtSlice';
import { setProfile } from '../Slices/ProfileSlice';

interface DecodedToken {
  sub: string;
  id: string;
  name: string;
  profileId?: string;
  role: string;
  exp: number;
  iat: number;
}

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.jwt) as string;

  // 1️⃣ Setup 401 interceptor once
  useEffect(() => {
    setupResponseInterceptor({dispatch, navigate});
  }, [dispatch, navigate]);

  // 2️⃣ Decode token and fetch profile
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        dispatch(setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.sub,
          role: decoded.role,
          profileId: decoded.profileId,
        }));

        if (decoded.profileId) {
          getProfile(decoded.profileId)
            .then(profile => {
              if (profile) {
                dispatch(setProfile(profile));
              } else {
                console.log('Profile not found - redirecting to create profile');
                navigate('/create-profile');
              }
            })
            .catch(err => {
              if (err.response?.status === 404) {
                console.log('Profile not found');
              } else {
                console.error('Profile fetch error:', err);
              }
            });
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        dispatch(removeUser());
        dispatch(removeJwt());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
      }
    }
  }, [token, dispatch, navigate]);

  // 3️⃣ Logout handler
  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  // 4️⃣ Hide header on auth pages
  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  const isLoggedIn = Boolean(token);

  return (
    <header className='w-full bg-mine-shaft-950 px-4 md:px-8 text-white flex items-center h-20'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <IconAsset className='h-8 w-8 text-yellow-400' stroke={2} />
        <span className='text-2xl font-semibold'>Hustlr</span>
      </Link>

      {/* Desktop nav */}
      <nav className='hidden md:flex flex-1 justify-center'>
        <NavLinks />
      </nav>

      {/* Right side */}
      <div className='flex items-center gap-4 ml-auto'>
        {isLoggedIn ? (
          <>
            <NotificationMenu />
            <div className='hidden md:block'>
              <ProfileMenu onLogout={handleLogout} />
            </div>
          </>
        ) : (
          <Link to='/login'>
            <Button variant='subtle' color='yellow' size='sm'>
              Login
            </Button>
          </Link>
        )}

        {/* Mobile menu toggle */}
        <Button
          variant='subtle'
          className='md:hidden'
          onClick={() => setDrawerOpen(true)}
        >
          <IconMenu2 className='h-6 w-6' />
        </Button>
      </div>

      {/* Mobile drawer */}
      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="xs"
        position="right"
        title="Menu"
      >
        {isLoggedIn ? (
          <div className='mb-4'>
            <ProfileMenu onLogout={handleLogout} />
          </div>
        ) : (
          <Link to="/login">
            <Button variant='subtle' color='yellow' fullWidth>
              Login
            </Button>
          </Link>
        )}
        <NavLinks isMobile onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </header>
  );
};

export default Header;