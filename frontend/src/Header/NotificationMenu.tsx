import { Menu,  Indicator, Notification, Stack } from '@mantine/core';
import {
  IconBell,
  IconCheck,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications, readNotification } from '../Services/NotifyService';

const NotificationMenu = () => {
    const user = useSelector((state: { user: { id: string } }) => state.user);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const removeNotification = (index: number) => {
        let not = [...notifications];
        not = not.filter((noti, i: number) => i !== index);
        setNotifications(not);
        readNotification(notifications[index].id)
        .then((res)=>{
            // Refresh notifications after marking as read
            if (user?.id) {
                getNotifications(user.id)
                    .then((res) => {
                        setNotifications(res);
                    })
                    .catch((err) => {
                        console.error('Failed to fetch notifications:', err);
                        setError('Failed to load notifications');
                    });
            }
        })
        .catch((err)=>{
            console.error('Failed to read notification:', err);
        })
    }
    const [error, setError] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<Array<{
        id: string;
        action: string;
        message: string;
    }>>([]);

    useEffect(() => {
        if (user?.id) {
            setLoading(true);
            setError(null);
            getNotifications(user.id)
                .then((res) => {
                    setNotifications(res);
                })
                .catch((err) => {
                    console.error('Failed to fetch notifications:', err);
                    setError('Failed to load notifications');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    
    
    return (
        <div>
            <Menu shadow="md" width={300} opened={opened} onChange={setOpened}>
                <Menu.Target>
                    <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                        <Indicator color="brightSun.4" size={8} offset={6} processing={loading}>
                            <IconBell stroke={1.5} className='h-5 w-5 md:h-6 md:w-6' />
                        </Indicator>
                    </div>
                </Menu.Target>
                <Menu.Dropdown>
                    <div className='flex flex-col gap-1 max-w-[300px]'>
                        {loading ? (
                            <div className="p-3 text-center">Loading...</div>
                        ) : error ? (
                            <div className="p-3 text-center text-red-500">{error}</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-3 text-center text-gray-500">No notifications</div>
                        ) : (
                            notifications.map((notification,index) => (
                                <Notification
                                    key={notification.id}
                                    className='hover:bg-mine-shaft-900 cursor-pointer'
                                    icon={<IconCheck onClick={()=>removeNotification(index)} style={{ width: 20, height: 20, display: 'block' }} />}
                                    color="teal"
                                    title={notification.action}
                                    withCloseButton
                                    onClose={() => removeNotification(index)} 
                                >
                                    {notification.message}
                                </Notification>
                            ))
                        )}
                    </div>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default NotificationMenu
