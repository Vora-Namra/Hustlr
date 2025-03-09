import { Menu, Switch, rem, Indicator } from '@mantine/core';
import {
  IconUserCircle,
  IconMessageCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
  IconBell,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotificationMenu = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, setOpened] = useState(false);
  return (
    <div>
       <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
      <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} className='h-5 w-5 md:h-6 md:w-6' />
          </Indicator>
        </div>

      </Menu.Target>

      <Menu.Dropdown>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Divider/>

      </Menu.Dropdown>
    </Menu>
    </div>
  )
}

export default NotificationMenu
