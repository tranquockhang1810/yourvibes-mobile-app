import { AdvertisePostRequestModel, AdvertisePostResponseModel } from "@/src/api/features/post/models/AdvertisePostModel";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel"
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { useAuth } from "@/src/context/auth/useAuth";
import { useState } from "react"
import Toast from "react-native-toast-message";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

const AdsViewModel = (repo: PostRepo) => {
  const { localStrings } = useAuth();
  const [loading, setLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);
  const [post, setPost] = useState<PostResponseModel | undefined>(undefined);
  const [ads, setAdsPost] = useState<AdvertisePostResponseModel | undefined>(undefined);
  const [adsAll, setAdsAll] = useState<AdvertisePostResponseModel[] | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const getPostDetail = async (id: string) => {
    try {
      setLoading(true);
      const res = await repo.getPostById(id);
      if (!res?.error) {
        setPost(res?.data);
      } else {
        Toast.show({
          type: 'error',
          text1: "Get Post Detail Failed",
          text2: res?.error?.message,
        })
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: "Get Post Detail Failed",
        text2: error?.error?.message,
      })
    } finally {
      setLoading(false);
    }
  }

  const advertisePost = async (params: AdvertisePostRequestModel) => {
    try {
      setAdsLoading(true);
      const res = await repo.advertisePost(params);
      if (!res?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Ads.AdvertisePostSuccess
        })
        if (res?.data) {
          // Mở trình duyệt với đường link quảng cáo và callback URL
          const result = await WebBrowser.openAuthSessionAsync(res.data);
  
          // Kiểm tra trạng thái khi người dùng quay lại app
          if (result.type === 'success' && result.url) {
            Toast.show({
              type: 'success',
              text1: "Redirect successful!",
              text2: "Your session has been completed.",
            });
          } else if (result.type === 'dismiss') {
            Toast.show({
              type: 'info',
              text1: "Session dismissed",
              text2: "You canceled the process.",
            });
          }
        }
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Ads.AdvertisePostFailed,
          text2: res?.error?.message,
        })
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Ads.AdvertisePostFailed,
        text2: error?.error?.message,
      })
    } finally {
      setAdsLoading(false);
    }
  }

  const getAdvertisePost = async (page: number, post_id: string) => {
    try {
      setAdsLoading(true);
      const res = await repo.getAdvertisePost(
        {
          post_id: post_id,
          page: page,
          limit: 10
        }
      );
      if (res?.data?.length > 0) {
        setAdsPost(res?.data?.[0]); // Lưu quảng cáo đang chạy.
        setAdsAll(Array.isArray(res?.data) ? res?.data : []); // Lưu toàn bộ danh sách quảng cáo.
      } else {
        setAdsPost(undefined);
        setAdsAll([]);
      }
      
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Ads.AdvertisePostFailed,
        text2: error?.error?.message,
      })
    } finally {
      setAdsLoading(false);
    }
  }

  
  return {
    loading,
    post,
    getPostDetail,
    advertisePost,
    adsLoading,
    getAdvertisePost,
    ads,
    setAdsPost,
    page,
    setPage,
    adsAll,
    setAdsAll

  }
}

export default AdsViewModel