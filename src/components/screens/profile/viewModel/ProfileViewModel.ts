import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { useAuth } from "@/src/context/auth/useAuth";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const ProfileViewModel = () => {
  const { user, localStrings } = useAuth();
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPosts = async () => {
    try {
      console.log('Fetching user posts...');
      if (!user?.id) {
        console.error('User is not logged in or has no ID');
        return;
      }
      setLoading(true);
      const response = await defaultPostRepo.getPosts({ user_id: user.id, sort_by: 'created_at', isDescending: true });
      if (!response?.error) {
        console.log('User posts fetched successfully:', response?.code);
        setPosts(response?.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi gọi API',
          text2: response?.error?.message,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi khi gọi API',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return {
    loading,
    posts,
    fetchUserPosts
  }
}

export default ProfileViewModel