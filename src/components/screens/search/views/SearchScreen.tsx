import {
  View,
  ScrollView,
  StatusBar,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import useColor from '@/src/hooks/useColor';
import Post from '@/src/components/common/Post';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import MyInput from '@/src/components/foundation/MyInput';
import { Button } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface User {
  id: string;
  name: string;
  avatar: string;
}

const SearchScreen: React.FC = () => {
  const { brandPrimary, backgroundColor } = useColor();

  // State to hold search keyword
  const [keyword, setKeyword] = useState<string>('');

  const users: User[] = [
    { id: '1', name: 'Trần Quốc Khang', avatar: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg' },
    { id: '2', name: 'Nguyễn Lê Anh Huy', avatar: 'https://i.pravatar.cc/300' },
    { id: '3', name: 'Phạm Văn C', avatar: 'https://i.pravatar.cc/300' },
    { id: '4', name: 'Trần Thị Thanh Phương', avatar: 'https://i.pravatar.cc/300' },
    { id: '5', name: 'Lê Thị D', avatar: 'https://i.pravatar.cc/300' }
  ];

  const posts: PostResponseModel[] = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Trần Quốc Khang',
        avatar: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg',
      },
      parentPost: {
        id: '2',
        user: {
          id: '2',
          name: 'Nguyễn Lê Anh Huy',
          avatar: 'https://i.pravatar.cc/300',
        },
        content: "Mới đi ăn về",
        likeCount: 100,
        commentCount: 12,
        createdAt: '10 phút trước',
        privacy: 'Public',
        status: true,
        mediaUrl: [
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-4.jpg', status: true },
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-5.jpg', status: true },
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331883/cld-sample-3.jpg', status: true }
        ]
      },
      content: "Post nè hehehehe",
      likeCount: 50,
      commentCount: 1,
      createdAt: '10 phút trước',
      privacy: 'Public',
      status: true,
      mediaUrl: [
        { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-4.jpg', status: true },
        { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-5.jpg', status: true },
        { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/video/upload/v1727932039/bandicam_2024-05-18_14-56-58-243_tl8tsq.mp4', status: true }
      ]
    },
    {
      id: '2',
      user: {
        id: '3',
        name: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/301',
      },
      parentPost: {
        id: '4',
        user: {
          id: '4',
          name: 'Lê Văn B',
          avatar: 'https://i.pravatar.cc/301',
        },
        content: "Vừa chạy bộ về",
        likeCount: 110,
        commentCount: 15,
        createdAt: '20 phút trước',
        privacy: 'Public',
        status: true,
        mediaUrl: [
          {
            "mediaUrl": "https://loremflickr.com/640/480/city",
            "status": true,
            "postID": "1"
          },
          {
            "mediaUrl": "https://loremflickr.com/640/480/city",
            "status": false,
            "postID": "2"
          },
          {
            "mediaUrl": "https://loremflickr.com/640/480/city",
            "status": true,
            "postID": "3"
          },
        ]
      },
      content: "Trời hôm nay đẹp quá",
      likeCount: 55,
      commentCount: 3,
      createdAt: '15 phút trước',
      privacy: 'Friends',
      status: true,
      mediaUrl: [
        {
          "mediaUrl": "https://loremflickr.com/640/480/city",
          "status": true,
          "postID": "4"
        },
        {
          "mediaUrl": "https://loremflickr.com/640/480/city",
          "status": false,
          "postID": "5"
        },
      ]
    },
    {
      id: '3',
      user: {
        id: '5',
        name: 'Phạm Thị C',
        avatar: 'https://i.pravatar.cc/302',
      },
      parentPost: undefined,
      content: "Món ăn tối nay nè",
      likeCount: 60,
      commentCount: 5,
      createdAt: '25 phút trước',
      privacy: 'Public',
      status: true,
      mediaUrl: [
        {
          "mediaUrl": "https://loremflickr.com/640/480/city",
          "status": false,
          "postID": "9"
        },
        {
          "mediaUrl": "https://loremflickr.com/640/480/city",
          "status": true,
          "postID": "10"
        },
        {
          "mediaUrl": "https://loremflickr.com/640/480/city",
          "status": true,
          "postID": "11"
        },
      ]
    },
  ];

  // Filter users and posts based on keyword
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()));
  const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{  backgroundColor: backgroundColor, paddingTop: 40 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            backgroundColor: backgroundColor,
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={brandPrimary} />
            </TouchableOpacity>
            <MyInput
              placeholder='Bạn đang tìm gì...'
              value={keyword}
              onChangeText={setKeyword}
              variant='outlined'
              allowClear={{
                clearIcon: <Ionicons name="close-outline" size={16} color={"white"} />,
              }}
              moreStyle={{
                width: '93%',
                paddingLeft: 10
              }}
              autoFocus
              prefix={<Ionicons name="search-outline" size={20} color={brandPrimary} style={{ marginRight: 10 }} />}
            />
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, height: "auto" }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Mọi người</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <View key={user?.id} style={{
                backgroundColor: backgroundColor,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginHorizontal: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "60%" }}>
                  <Image
                    source={{ uri: user?.avatar }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                    }}
                  />
                  <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{user?.name}</Text>
                </View>
                <Button style={{ width: "27%", borderRadius: 30, borderColor: brandPrimary, height: 35 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Thêm bạn</Text>
                </Button>
              </View>
            ))
          ) : (
            <Text style={{ paddingHorizontal: 20, color: 'gray' }}>Không tìm thấy người dùng</Text>
          )}
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bài viết</Text>
        </View>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Post key={post?.id} post={post}>
              {post?.parentPost && <Post post={post?.parentPost} isParentPost />}
            </Post>
          ))
        ) : (
          <Text style={{ paddingHorizontal: 20, color: 'gray' }}>Không tìm thấy bài đăng</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
