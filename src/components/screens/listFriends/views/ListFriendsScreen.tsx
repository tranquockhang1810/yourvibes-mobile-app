import { View, Text, TouchableOpacity, ActivityIndicator, Image, SectionList } from 'react-native'
import React, { useEffect } from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useListFriendsViewModel from '../viewModel/ListFriendsViewModel';
import { useAuth } from '@/src/context/auth/useAuth';

const ListFriendsScreen = ({userId}: {userId: string}) => {
    const {
        loading,
        friends,
        handleEndReached,
        hasMore,
        page,
        handleMoreOptions,
        fetchFriends,
      } = useListFriendsViewModel();
    
      const { localStrings } = useAuth();
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
    
    const Header = () => (
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
            console.log("fetchFriends", page, "userId:", userId);
            
            fetchFriends(page, userId);
        }
    }, [userId]);
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

export default ListFriendsScreen