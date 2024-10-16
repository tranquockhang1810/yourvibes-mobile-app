import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'; // Thêm ActivityIndicator
import useColor from '@/src/hooks/useColor';
import { useRouter } from 'expo-router';
import Post from '@/src/components/common/Post';
import { useAuth } from '@/src/context/auth/useAuth';
import ProfileViewModel from '../viewModel/ProfileViewModel';

const PostList = () => {
  const { backgroundColor, lightGray, grayBackground, brandPrimary } = useColor();
  const router = useRouter();
  const { user, localStrings } = useAuth();
  const { loading, posts} = ProfileViewModel();

  return (
    <View style={{ flex: 1, backgroundColor: grayBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
            <ActivityIndicator size="large" color={brandPrimary} />
          </View>
        ) : (
          posts?.map((post) => (
            <Post key={post?.id} post={post}>
              {post?.parent_post && <Post post={post?.parent_post} isParentPost />}
            </Post>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default PostList;
