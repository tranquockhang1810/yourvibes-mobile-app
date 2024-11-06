import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'; // Thay ScrollView bằng FlatList
import { Image } from 'expo-image';
import useColor from '@/src/hooks/useColor';
import { useRouter } from 'expo-router';
import Post from '@/src/components/common/Post';
import { useAuth } from '@/src/context/auth/useAuth';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import { UserModel } from '@/src/api/features/authenticate/model/LoginModel';
import EditPostViewModel from '../../editPost/viewModel/EditPostViewModel';
import { defaultPostRepo } from '@/src/api/features/post/PostRepo';

const PostList = React.memo(({
  loading,
  posts,
  loadMorePosts,
  user
}: {
  loading: boolean;
  posts: PostResponseModel[];
  loadMorePosts: () => void;
  user: UserModel
}) => {
  const { backgroundColor, lightGray, grayBackground, brandPrimary } = useColor();
  const router = useRouter();
  const { localStrings } = useAuth();
  const {deletePost} = EditPostViewModel(defaultPostRepo);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={brandPrimary} />
      </View>
    );
  };

  const renderFlatList = useCallback(() => {
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post key={item?.id} post={item} deletePost={deletePost}>
            {item?.parent_post && <Post post={item?.parent_post} isParentPost />}
          </Post>
        )}
        keyExtractor={(item) => item?.id as string}
        ListFooterComponent={renderFooter}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true} 
        showsVerticalScrollIndicator={false}
      />
    )
  }, [posts]);

  return (
    <View style={{ flex: 1, backgroundColor: grayBackground }}>
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

      {renderFlatList()}
    </View>
  );
});

export default PostList;
