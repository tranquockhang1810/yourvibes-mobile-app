import { useEffect, useState, } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet"; // Import useActionSheet
import Toast from "react-native-toast-message"; 

type Friend = {
  id: string;
  name: string;
  avatar: string;
};

const useListFriendsViewModel = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchFriends = async (pageNumber: number) => {
    setLoading(true);
    const newFriends = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: `friend-${pageNumber}-${i}-${Date.now()}`,
        name: `Phạm Minh Thảo Vũ Trụ ${pageNumber * 10 + i + 1}`,
        avatar: `https://picsum.photos/40/40?random=${Math.floor(
          Math.random() * 1000
        )}`,
      }));

    setHasMore(newFriends.length > 0);
    setFriends((prevFriends) => [...prevFriends, ...newFriends]);
    setLoading(false);
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

  const handleMoreOptions = (friend: Friend) => {
    const options = [
      `Hủy kết bạn với ${friend.name}`,
      "Xem trang cá nhân",
      "Chặn",
      "Hủy",
    ];
  
    const cancelButtonIndex = options.length - 1;
  
    showActionSheetWithOptions(
      {
        title: "Chọn hành động",
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
              text2: "Bạn có thể tìm kiếm lại bạn bè trong danh sách.",
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
  };
  
  
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