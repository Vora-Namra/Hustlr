
import axiosInstance from "../Interceptor/AuthInterceptor";


const getNotifications = async (id: any) => {
    return axiosInstance.get(`/notification/get/${id}`)
    .then(res=>res.data)
    .catch(err=>{throw err});
}

const readNotification = async (id: any)=> {
    
        return axiosInstance.put(`/notification/read/${id}`)
            .then(res => res.data)
            .catch(err=>{throw err});
    
}

export { getNotifications, readNotification };
