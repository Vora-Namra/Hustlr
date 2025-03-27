import { Indicator, Menu, rem, Notification } from "@mantine/core";
import { useState } from "react";
import { IconBell, IconCheck } from "@tabler/icons-react";

const NotiMenu = () => {
  const [opened, setOpened] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleBellClick = () => {
    setShowNotification(true);
    setOpened(true); // Always open the menu when clicking the bell
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div 
          className='bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer' 
          onClick={handleBellClick}
        >
          <Indicator color="brightSun.4" offset={6} processing size={6}>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {showNotification && (
          <Notification 
            icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} 
            title="All good!" 
            withCloseButton={false}
          >
            Everything is fine
          </Notification>
        )}
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;