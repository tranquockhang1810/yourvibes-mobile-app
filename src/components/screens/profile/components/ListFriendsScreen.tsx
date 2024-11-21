import React, { useEffect } from "react";
import {
  View,
  SectionList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/src/context/auth/useAuth";
import ProfileViewModel from "../viewModel/ProfileViewModel";
import UserProfileViewModel from "../viewModel/UserProfileViewModel";

const ListFriends: React.FC = () => { 
  const { userId } = useLocalSearchParams();
  const {user, localStrings} = useAuth();
  const {
    loading,
    friends,
    handleEndReached,
    hasMore,
    page,
    handleMoreOptions,
    // fetchMyFriends,
    fetchFriends,
  } =  UserProfileViewModel();
  
  const router = useRouter();


  const renderFriend = ({
    item,
  }: {
    item: { id: string; avatar: string; family_name: string; name: string };
  }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{ uri: item.avatar }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#e0e0e0",
            marginRight: 10,
          }}
        />
        <Text style={{ fontSize: 16, color: "black" }}>
          {item.family_name} {item.name}
        </Text>
      </View>
      <TouchableOpacity
        style={{ paddingHorizontal: 10 }}
        onPress={() => handleMoreOptions(item)}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const Header: React.FC = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        marginTop: 35,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {localStrings.ListFriends.ListFriends}
      </Text>
      <View />
    </View>
  );
  useEffect(() => {
    if (userId) {
      console.log('User ID:', userId);
        // Kiểm tra nếu `userId` là của bản thân hay bạn bè
        // if (userId === user?.id) {
        //   fetchMyFriends(page);  // Gọi API của bản thân
        // } else {
          fetchFriends(page);  // Gọi API của bạn bè
        // }
    } else {
      console.log('No userId found in the `URL');
    }
  }, [userId, page, user]);
  useEffect(() => {
    if (friends.length > 0) {
      console.log('Danh sách bạn bè của user:', friends); // Log danh sách bạn bè
    }
  }, [friends]);  // Chạy lại mỗi khi friends thay đổi
  return (
    <ActionSheetProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header />
        <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 20 }}>
          {loading && page === 1 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <SectionList
              sections={[{ title: "", data: friends as any }]}
              renderItem={renderFriend}
              keyExtractor={(item) => item.id}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore ? (
                  <ActivityIndicator size="small" color="blue" />
                ) : null
              }
            />
          )}
        </View>
      </View>
    </ActionSheetProvider>
  );
};

export default ListFriends;