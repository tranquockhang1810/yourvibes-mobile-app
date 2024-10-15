  import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity } from 'react-native';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import useColor from '@/src/hooks/useColor';
import { useRouter } from 'expo-router';
import Post from '@/src/components/common/Post';
import { useAuth } from '@/src/context/useAuth';
import { ApiPath } from '@/src/api/ApiPath';
import { defaultAuthenRepo } from '@/src/api/features/authenticate/AuthenRepo';

const PostList: React.FC = () => {
  const { backgroundColor, lightGray, grayBackground } = useColor();
  const router = useRouter();
  const { user, localStrings } = useAuth();
  const [posts, setPosts] = useState<PostResponseModel[]>([]);

// Hàm lấy bài viết của người dùng
const fetchUserPosts = async () => {
  try {
      console.log("Fetching user posts...");
      if (!user?.id) {
          console.error("User is not logged in or has no ID");
          return;
      }

      const apiUrl = ApiPath.GET_POSTS(user.id);
      console.log("API URL:", apiUrl);

      const response = await defaultAuthenRepo.getUserPost({ userId: user.id });
      console.log('API response:', response);

      // Kiểm tra cấu trúc của phản hồi
      if (response && response.data && Array.isArray(response.data)) {
          // Thiết lập posts từ dữ liệu nhận được
          setPosts(response.data);
          console.log("Posts set:", response.data);
      } else {
          // Kiểm tra xem có phản hồi không và log lỗi
          if (response && response.message) {
              console.error("API message:", response.message);
          }
          console.error("Dữ liệu không phải là mảng:", response.data);
          console.error("Toàn bộ phản hồi:", response);
      }
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
  }
};

// Gọi API khi component được mount
useEffect(() => {
  fetchUserPosts();
}, []); // Chỉ gọi một lần khi component được mount

  return (
    <View style={{ flex: 1, backgroundColor: grayBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          </Post>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostList;