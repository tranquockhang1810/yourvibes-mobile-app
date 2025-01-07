import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import useColor from "@/src/hooks/useColor";
import Post from "@/src/components/common/Post";
import { ActivityIndicator } from "@ant-design/react-native";
import HomeViewModel from "../viewModel/HomeViewModel";
import { defaultNewFeedRepo } from "@/src/api/features/newFeed/NewFeedRepo";
import { router } from "expo-router";
import { useAuth } from "@/src/context/auth/useAuth";
import { Platform } from "react-native";
import Toast from 'react-native-toast-message'

const HomeScreen = () => {
  const { brandPrimary, backgroundColor, lightGray } = useColor();
  const {
    loading,
    newFeeds,
    fetchNewFeeds,
    loadMoreNewFeeds,
    refeshLoading,
    refreshNewFeeds,
    onViewableItemsChanged,
    visibleItems
  } = HomeViewModel(defaultNewFeedRepo)
  const { user, localStrings } = useAuth();

  const renderAddPost = () => {
    return (
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/add' })}
      >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: backgroundColor,
            borderWidth: 1,
            borderColor: lightGray,
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: user?.avatar_url || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: lightGray,
            }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text>{user?.family_name + ' ' + user?.name || localStrings.Public.Username}</Text>
            <Text style={{ color: 'gray' }}>{localStrings.Public.Today}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color={brandPrimary} />
      </View>
    );
  };

  useEffect(() => {
    fetchNewFeeds();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: backgroundColor,
          paddingTop: Platform.OS === "ios" ? 40 : 0,
        }}
      >
        <View
          style={{
            height: 70,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={require("@/assets/images/yourvibes_black.png")}
            style={{
              width: 210,
              height: "100%",
              objectFit: "contain",
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      {/* Content */}

      <FlatList
        ListHeaderComponent={renderAddPost}
        data={newFeeds}
        renderItem={({ item }) => (
          <Post
            key={item?.id}
            post={item}
            isVisible={visibleItems.includes(item?.id as string)}
          >
            {item?.parent_post && (
              <Post
                post={item?.parent_post}
                isParentPost
                isVisible={visibleItems.includes(item?.parent_post?.id as string)}
              />
            )}
          </Post>
        )}
        keyExtractor={(item) => item?.id as string}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreNewFeeds}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshNewFeeds}
        refreshing={refeshLoading}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      <Toast />
    </View>
  );
};

export default HomeScreen;