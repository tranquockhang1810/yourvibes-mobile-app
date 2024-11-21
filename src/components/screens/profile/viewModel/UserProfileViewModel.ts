import { FriendStatus } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { UserModel } from "@/src/api/features/authenticate/model/LoginModel";
import { PostResponseModel } from "@/src/api/features/post/models/PostResponseModel";
import { defaultPostRepo } from "@/src/api/features/post/PostRepo";
import { defaultProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { useAuth } from "@/src/context/auth/useAuth";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { FriendResponseModel } from "@/src/api/features/profile/model/FriendReponseModel";
import { useActionSheet } from "@expo/react-native-action-sheet";

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

  const [selectedFriendName, setSelectedFriendName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const getFriendCount = () => friendCount;
  const [otherUserFriends, setOtherUserFriends] = useState<FriendResponseModel[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [friends, setFriends] = useState<FriendResponseModel[]>([]);
  const [friendCount, setFriendCount] = useState(0);

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
        setNewFriendStatus(response?.data?.friend_status || FriendStatus.NotFriend);
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

const fetchFriends = async (page: number) => {
    try {
      const response = await defaultProfileRepo.getListFriends({
        page: page,
        limit: 10,
        user_id: userInfo?.id,
      });
      console.log("response: ", response);
      
      if (response?.data) {
        if (Array.isArray(response?.data)) {
          const friends = response?.data.map(
            (friendResponse: FriendResponseModel) => ({
              id: friendResponse.id,
              family_name: friendResponse.family_name,
              name: friendResponse.name,
              avatar: friendResponse.avatar_url,
            })
          ) as FriendResponseModel[];
          setFriends(friends);
          setFriendCount(friends.length); //Đếm số lượng bạn bè
        } else {
          console.error("response.data is not an array");
        }
    }else{
      Toast.show({
        type: 'error',
        text2: response?.error?.message,
      });
    }
    // return friends;
  }
  catch (error: any) {
    console.error(error);
    Toast.show({
      type: 'error',
      text2: error?.message,
    });
  }
}
useEffect(() => {
  if (userInfo) {
    fetchUserPosts();
    fetchFriends(page);
    console.log("Số lượng bạn bè ở list friends:", friendCount);
    
  }
}, [page, userInfo, friendCount]);

const filteredFriends = friends.filter((friend) =>
  friend?.name?.toLowerCase().includes(search.toLowerCase())
);

const handleEndReached = () => {
  if (!loading && hasMore) {
    setPage((prevPage) => prevPage + 1);
  }
};

const { showActionSheetWithOptions } = useActionSheet();

const handleMoreOptions = useCallback(
  (friend: FriendResponseModel) => {
    setSelectedFriendName(friend.name || "");
    const options = [
      `${localStrings.ListFriends.Unfriend}`,
      `${localStrings.ListFriends.ViewProfile}`,
      `${localStrings.ListFriends.Block}`,
      `${localStrings.ListFriends.Cancel}`,
    ];

    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        title: `Chọn hành động với ${friend.name}`,
        options,
        cancelButtonIndex,
        cancelButtonTintColor: "#F95454",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: // Hủy kết bạn
            console.log(`Hủy kết bạn với ${friend.name}`);
            // Hiện thông báo tổng quan
            Toast.show({
              text1: `Bạn đã hủy kết bạn với ${friend.name}`,
              text2: "Bạn có thể tìm kiếm lại bạn bè ở YourVibes.",
            });
            break;

          case 1: // Xem trang cá nhân
            console.log(`Xem trang cá nhân của ${friend.name}`);
            break;

          case 2: // Chặn
            console.log(`Chặn ${friend.name}`);
            // Hiện thông báo tổng quan
            Toast.show({
              text1: `Bạn đã chặn ${friend.name}`,
              text2: "Bạn sẽ không nhận được thông báo từ người này.",
            });
            break;

          default:
            // Không có hành động nào được chọn
            break;
        }
      }
    );
  },
  [localStrings, showActionSheetWithOptions]
);
 
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
    unFriend,
    friendCount,
    search,
    setSearch,
    friends: filteredFriends,
    handleEndReached,
    page,
    handleMoreOptions,
    getFriendCount,
    fetchFriends,
  }
}

export default UserProfileViewModel