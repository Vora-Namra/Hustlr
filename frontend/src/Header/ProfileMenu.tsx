// src/Header/ProfileMenu.tsx
import React, { useState } from 'react';
import { Menu, Avatar, Switch, rem } from '@mantine/core';
import {
  IconUserCircle,
  IconMessageCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/JwtSlice';

interface ProfileMenuProps {
  /** Called when the user clicks “Logout”. If omitted, falls back to a default. */
  onLogout?: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  // Default logout behavior
  const defaultLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
    localStorage.clear();
    navigate('/login');
  };

  const handleLogOut = onLogout ?? defaultLogout;

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="hidden sm:block text-sm md:text-base">
            <div className="hidden sm:block text-sm md:text-base">
  {user?.name || 'Guest'}
</div>
          </div>
          <Avatar
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : 'avatar.png'
            }
            alt="profile"
            size="sm"
            className="md:h-10 md:w-10"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color="yellow"
                />
              }
              offLabel={
                <IconMoonStars size={16} stroke={2.5} color="cyan" />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogOut}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
