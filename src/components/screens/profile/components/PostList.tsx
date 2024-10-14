import React from 'react';
import { View, Text, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import useColor from '@/src/hooks/useColor';
import { useRouter } from 'expo-router';
import Post from '@/src/components/common/Post';
import { useAuth } from '@/src/context/useAuth';

interface PostListProps {
  posts: PostResponseModel[];
  refreshing: boolean;
  onRefresh: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, refreshing, onRefresh }) => {
  const { backgroundColor, lightGray, grayBackground } = useColor();
  const router = useRouter();
  const { user, localStrings } = useAuth();
  
  return (
    <View style={{ flex: 1, backgroundColor: grayBackground }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  // Tích hợp chức năng refresh
      >
        {/* Post Input Section */}
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/add' })}  // Điều hướng đến trang thêm bài viết
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
                uri: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg',
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

        {/* Post list */}
        {posts.map((post) => (
          <Post
            key={post?.id}
            post={post}
          >
            {post?.parentPost && <Post post={post?.parentPost} isParentPost />}
          </Post> // Hiển thị từng bài viết bằng component Post
        ))}
      </ScrollView>
    </View>
  );
};

export default PostList;