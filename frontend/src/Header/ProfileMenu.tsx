import { Menu, Button, Text, Avatar, Switch, rem, ThemeIcon } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProfileMenu=()=> {
    const [checked, setChecked] = useState(false)
    const [opened, setOpened] = useState(false)
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className='flex cursor-pointer items-center gap-2 '>
                      <div>John</div>
                      <Avatar src="avatar.png" alt="it's me"/>
                    </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
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
           onChange={(event) => setChecked(event.currentTarget.checked)} size='md' color='dark.4' onLabel={<IconSun
            style={{width: rem(16),height: rem(16)}}
            stroke={2.5}
            color="yellow"
            />} offLabel={<IconMoonStars size={16}
             stroke={2.5}
              color="cyan" />}/>
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}