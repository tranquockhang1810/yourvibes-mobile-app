import { useState } from 'react'
import { NotificationResponseModel } from '@/src/api/features/notification/models/NotifiCationModel';
import { defaultNotificationRepo, NotifiCationRepo } from '@/src/api/features/notification/NotifiCationRepo';
import Toast from 'react-native-toast-message';
import { use } from 'i18next';

const NotifiCationViewModel = (repo: NotifiCationRepo) => {
    const [notifications, setNotifications] = useState<NotificationResponseModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const limit = 10;

    const fetchNotifications = async (newPage: number = 1) => {
        try {
            setLoading(true);
            const response = await repo.getNotifications({
                sort_by: 'created_at',
                isDescending: true,
                page: newPage,
                limit: limit,
            });

            if (!response?.error) {
                if (newPage === 1) {
                    setNotifications(response?.data);
                } else {
                    setNotifications((prevNotifications) => [...prevNotifications, ...response?.data]);
                }
                const { page: currentPage, limit: currentLimit, total: totalRecords } = response?.paging;
                setTotal(totalRecords);
                setPage(currentPage);
                setHasMore(currentPage * currentLimit < totalRecords);
            } else {
                console.error("Get Notifications Failed", response?.error?.message);
                
                Toast.show({
                    type: 'error',
                    text1: "Get Notifications Failed",
                    text2: response?.error?.message,
                });
            }
        } catch (error: any) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: "Get Notifications Failed catch",
                text2: error?.message,
            });
        } finally {
            setLoading(false);
        }
    };
    const loadMoreNotifi =() => {
        if(!loading && hasMore){
            setPage((prevPage) => prevPage + 1);
            fetchNotifications(page + 1);
        }
    };
    const updateNotification = async (data : NotificationResponseModel) => {
        console.log(data.id);
        
        if(!data.id){
            Toast.show({
                type: 'error',
                text1: "Update Notification Failed",
                text2: "Notification Id is required",
            });
            return;
        }
        try {
            setLoading(true);
            const response = await repo.updateNotification(data);
            if(!response?.error){
                Toast.show({
                    type: 'success',
                    text1: "Update Notification Success",
                });
                fetchNotifications();
            }else{
                Toast.show({
                    type: 'error',
                    text1: "Update Notification Failed",
                    text2: response?.error?.message,
                });
            }
        }catch(error: any){
            console.error(error);
            Toast.show({
                type: 'error',
                text1: "Update Notification Failed catch",
                text2: error?.message,
            });
        }finally{
            setLoading(false);
        }
    }
    const updateAllNotification = async () => {
        try {
            setLoading(true);
            const response = await repo.updateAllNotification();
            if(!response?.error){
                Toast.show({
                    type: 'success',
                    text1: "Update All Notification Success",
                });
                fetchNotifications();
            }else{
                Toast.show({
                    type: 'error',
                    text1: "Update All Notification Failed",
                    text2: response?.error?.message,
                });
            }
        }catch(error: any){
            console.error(error);
            Toast.show({
                type: 'error',
                text1: "Update All Notification Failed catch",
                text2: error?.message,
            });
        }finally{
            setLoading(false);
        }
    }


  return{
    notifications,
    loading,
    page,
    total,
    hasMore,
    limit,
    fetchNotifications,
    loadMoreNotifi,
    updateNotification,
    updateAllNotification
  }
}

export default NotifiCationViewModel