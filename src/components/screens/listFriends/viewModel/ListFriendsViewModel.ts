import { useEffect, useState,useCallback } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet"; // Import useActionSheet
import Toast from "react-native-toast-message"; 

import { useAuth } from "@/src/context/auth/useAuth";
import { defaultProfileRepo } from "@/src/api/features/profile/ProfileRepository";
import { FriendResponseModel } from "@/src/api/features/profile/model/FriendReponseModel";

type Friend = {
  id: string;
  name: string;
  avatar: string;
};

const useListFriendsViewModel = () => {
  const [selectedFriendName, setSelectedFriendName] = useState<string>("");
  const { localStrings } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const fetchFriends = async (page: number) => {
    try {
      const response = await defaultProfileRepo.getListFriends({
        limit: 10,
        page: 1,
      });
      if (response.data) {
        if (Array.isArray(response.data)) {
          const friends = response.data.map((friendResponse: FriendResponseModel) => ({
            id: friendResponse.id,
            family_name: friendResponse.family_name,
            name: friendResponse.name,
            avatar: friendResponse.avatar_url,
          })) as Friend[];
          setFriends(friends);
        } else {
          // Handle the case when response.data is not an array
          console.error("response.data is not an array");
        }
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
    }
  };

  useEffect(() => {
    fetchFriends(page);
  }, [page]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEndReached = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const { showActionSheetWithOptions } = useActionSheet(); // Khai báo showActionSheetWithOptions

  const handleMoreOptions = useCallback((friend: Friend) => { 
    setSelectedFriendName(friend.name); // Cập nhật tên người bạn được chọn
    const options = [
      `${localStrings.ListFriends.Unfriend}`,
      `${localStrings.ListFriends.ViewProfile}`,
      `${localStrings.ListFriends.Block}`,
      `${localStrings.ListFriends.Cancel}`,
    ];
  
    const cancelButtonIndex = options.length - 1;
  
    showActionSheetWithOptions(
      { 
         title : `Chọn hành động với ${friend.name}`,
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
  }, [localStrings, showActionSheetWithOptions]);
  
  
  return {
    search,
    setSearch,
    loading,
    friends: filteredFriends,
    handleEndReached,
    hasMore,
    page,
    handleMoreOptions, // Xuất khẩu hàm này
  };
};

export default useListFriendsViewModel;