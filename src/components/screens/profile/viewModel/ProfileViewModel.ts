import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { useAuth } from "@/src/context/auth/useAuth";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { defaultProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { FriendResponseModel } from "@/src/api/features/profile/model/FriendReponseModel";

const ProfileViewModel = () => {
  const { user, localStrings } = useAuth();
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const limit = 10;
  const [friends, setFriends] = useState<FriendResponseModel[]>([]);
  const fetchUserPosts = async (newPage: number = 1) => {
    try {
      setLoading(true);
      const response = await defaultPostRepo.getPosts({
        user_id: user?.id,
        sort_by: 'created_at',
        isDescending: true,
        page: newPage,
        limit: limit,
      });

      if (!response?.error) {
        if (newPage === 1) {
          setPosts(response?.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response?.data]);
        }
        const { page: currentPage, limit: currentLimit, total: totalRecords } = response?.paging;

        setTotal(totalRecords);
        setPage(currentPage);
        setHasMore(currentPage * currentLimit < totalRecords);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Posts.GetPostsFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Posts.GetPostsFailed,
        text2: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchUserPosts(page + 1);
    }
  };
  
  const [friendCount, setFriendCount] = useState(0);

  const fetchUserFriends = async (newPage: number = 1) => {
    try {
      const response = await defaultProfileRepo.getListFriends({
        limit: 10,
        page: newPage,
      });
      if (response.data) {
        const friends = response.data;
        if (Array.isArray(friends)) {
          setFriends((prevFriends) => [...prevFriends, ...friends]);
          setFriendCount(friends.length); // Cập nhật số lượng bạn bè
          console.log("đếm nè: ",setFriendCount);
          
        } else {
          setFriends([friends]);
          setFriendCount(1); // Cập nhật số lượng bạn bè
          console.log("Đếm nè: ", setFriendCount);
        }
        console.log(friends);
      } else {
        Toast.show({
          type: 'error',
          text2: response.error.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text2: error.message,
      });
    } finally {
      // Xử lý sau khi fetch dữ liệu
    }
  };

  return {
    loading,
    posts,
    hasMore,
    loadMorePosts,
    fetchUserPosts,
    total,
    friends,
    fetchUserFriends,
    friendCount,
  }
};

export default ProfileViewModel;