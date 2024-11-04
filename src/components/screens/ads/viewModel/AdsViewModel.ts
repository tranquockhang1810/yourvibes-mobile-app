import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel"
import { PostRepo } from "@/src/api/features/post/PostRepo";
import { useEffect, useState } from "react"
import Toast from "react-native-toast-message";

const AdsViewModel = (repo: PostRepo) => {
  const [loading, setLoading] = useState(false);
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

  return {
    loading,
    post,
    getPostDetail
  }
}

export default AdsViewModel