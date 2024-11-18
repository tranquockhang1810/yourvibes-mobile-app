import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { useAuth } from "@/src/context/auth/useAuth";
import { useState, useEffect } from "react";
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
  const [friendCount, setFriendCount] = useState(0);
  const fetchUserPosts = async (newPage: number = 1) => {
    try {
      setLoading(true);
      const response = await defaultPostRepo.getPosts({
        user_id: user?.id,
        sort_by: "created_at",
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
        const {
          page: currentPage,
          limit: currentLimit,
          total: totalRecords,
        } = response?.paging;

        setTotal(totalRecords);
        setPage(currentPage);
        setHasMore(currentPage * currentLimit < totalRecords);
      } else {
        Toast.show({
          type: "error",
          text1: localStrings.Profile.Posts.GetPostsFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
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


  // const fetchFriends = async (page: number, userId?: string) => {
  //   console.log("fetchFriends: ", page);
  //   try {
  //     const response = await defaultProfileRepo.getListFriends({
  //       limit: 10,
  //       page: 1,
  //       user_id: userId,
  //     });
  //     if (response.data) {
  //       if (Array.isArray(response.data)) {
  //         const friends = response.data.map(
  //           (friendResponse: FriendResponseModel) => ({
  //             id: friendResponse.id,
  //             family_name: friendResponse.family_name,
  //             name: friendResponse.name,
  //             avatar: friendResponse.avatar_url,
  //           })
  //         ) as FriendResponseModel[];
  //         return friends;
  //       } else {
  //         console.error("response.data is not an array");
  //       }
  //     } else {
  //       throw new Error(response.error.message);
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   if (user?.id) {
  //     fetchFriends(page, user?.id).then((friends) => {
  //       setFriends(friends as FriendResponseModel[]);
  //       setFriendCount(friends?.length ?? 0); //Đếm số lượng bạn bè
  //     });
  //   } else {
  //     fetchFriends(page).then((friends) => {
  //       setFriends(friends as FriendResponseModel[]);
  //       setFriendCount(friends?.length ?? 0); //Đếm số lượng bạn bè
  //     });
  //   }
  // }, [page, user?.id]);


  return {
    loading,
    posts,
    hasMore,
    loadMorePosts,
    fetchUserPosts,
    total,
    friends,
    friendCount,
    // fetchFriends,
  };
};

export default ProfileViewModel;
