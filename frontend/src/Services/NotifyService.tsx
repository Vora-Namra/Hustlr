import axios from 'axios';

const base_url = "http://localhost:8080/notification/";

interface Notification {
    id: string;
    userId: string;
    message: string;
    action: string;
    route: string;
    status: string;
    timestamp: string;
}

const getNotifications = async (id: string): Promise<Notification[]> => {
    try {
        const response = await axios.get(`${base_url}get/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching notifications:', err);
        throw err;
    }
}

const readNotification = async (id: string): Promise<any> => {
    try {
        const response = await axios.put(`${base_url}read/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error marking notification as read:', err);
        throw err;
    }
}

export { getNotifications, readNotification };
