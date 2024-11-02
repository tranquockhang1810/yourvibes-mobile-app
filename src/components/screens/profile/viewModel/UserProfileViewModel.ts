import { FriendStatus } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { UserModel } from "@/src/api/features/authenticate/model/LoginModel";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { defaultProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { useAuth } from "@/src/context/auth/useAuth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const UserProfileViewModel = () => {
  const { localStrings } = useAuth();
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const [userInfo, setUserInfo] = useState<UserModel | null>(null);
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const [newFriendStatus, setNewFriendStatus] = useState<FriendStatus | undefined>(undefined);

  const fetchUserPosts = async (newPage: number = 1) => {
    try {
      setLoading(true);
      const response = await defaultPostRepo.getPosts({
        user_id: userInfo?.id,
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

  const fetchUserProfile = async (id: string) => {
    try {
      setProfileLoading(true);
      const response = await defaultProfileRepo.getProfile(id);
      if (!response?.error) {
        setUserInfo(response?.data);
        setNewFriendStatus(response?.data?.friend_status);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Info.GetInfoFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Info.GetInfoFailed,
        text2: error?.message,
      });
    } finally {
      setProfileLoading(false);
    }
  }

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchUserPosts(page + 1);
    }
  };

  const sendFriendRequest = async (id: string) => {
    try {
      setSendRequestLoading(true);
      const response = await defaultProfileRepo.sendFriendRequest(id);
      if (!response?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Profile.Friend.SendRequestSuccess,
        });
        setNewFriendStatus(FriendStatus.SendFriendRequest);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Friend.SendRequestFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Friend.SendRequestFailed,
        text2: error?.message,
      });
    } finally {
      setSendRequestLoading(false);
    }
  }

  const cancelFriendRequest = async (id: string) => {
    try {
      setSendRequestLoading(true);
      const response = await defaultProfileRepo.cancelFriendRequest(id);
      if (!response?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Profile.Friend.CancelRequestSuccess,
        });
        setNewFriendStatus(FriendStatus.NotFriend);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Friend.CancelRequestFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Friend.CancelRequestFailed,
        text2: error?.message,
      });
    } finally {
      setSendRequestLoading(false);
    }
  }

  const refuseFriendRequest = async (id: string) => {
    try {
      setSendRequestLoading(true);
      const response = await defaultProfileRepo.refuseFriendRequest(id);
      if (!response?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Profile.Friend.FriendResponseSuccess,
        });
        setNewFriendStatus(FriendStatus.NotFriend);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Friend.FriendResponseFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Friend.FriendResponseFailed,
        text2: error?.message,
      });
    } finally {
      setSendRequestLoading(false);
    }
  }

  const acceptFriendRequest = async (id: string) => {
    try {
      setSendRequestLoading(true);
      const response = await defaultProfileRepo.acceptFriendRequest(id);
      if (!response?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Profile.Friend.FriendResponseSuccess,
        });
        setNewFriendStatus(FriendStatus.IsFriend);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Friend.FriendResponseFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Friend.FriendResponseFailed,
        text2: error?.message,
      });
    } finally {
      setSendRequestLoading(false);
    }
  }

  const unFriend = async (id: string) => {
    try {
      setSendRequestLoading(true);
      const response = await defaultProfileRepo.unfriend(id);
      if (!response?.error) {
        Toast.show({
          type: 'success',
          text1: localStrings.Profile.Friend.UnfriendSuccess,
        });
        setNewFriendStatus(FriendStatus.NotFriend);
      } else {
        Toast.show({
          type: 'error',
          text1: localStrings.Profile.Friend.UnfriendFailed,
          text2: response?.error?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: localStrings.Profile.Friend.UnfriendFailed,
        text2: error?.message,
      });
    } finally {
      setSendRequestLoading(false);
    }
  }

  useEffect(() => {
    if (userInfo) {
      fetchUserPosts();
    }
  }, [userInfo]);

  return {
    loading,
    profileLoading,
    posts,
    hasMore,
    loadMorePosts,
    fetchUserPosts,
    total,
    fetchUserProfile,
    userInfo,
    sendFriendRequest,
    sendRequestLoading,
    refuseFriendRequest,
    cancelFriendRequest,
    newFriendStatus,
    setNewFriendStatus,
    acceptFriendRequest,
    unFriend
  }
}

export default UserProfileViewModel