import { AdvertisePostRequestModel } from "@/src/api/features/post/models/AdvertisePostModel";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel"
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { useAuth } from "@/src/context/auth/useAuth";
import { useState } from "react"
import Toast from "react-native-toast-message";

const AdsViewModel = (repo: PostRepo) => {
  const { localStrings } = useAuth();
  const [loading, setLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);
  const [post, setPost] = useState<PostResponseModel | undefined>(undefined);

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

  return {
    loading,
    post,
    getPostDetail,
    advertisePost,
    adsLoading
  }
}

export default AdsViewModel