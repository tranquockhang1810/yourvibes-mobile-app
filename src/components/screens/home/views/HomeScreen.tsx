import {
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  RefreshControl
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useColor from '@/src/hooks/useColor'
import Post from '@/src/components/common/Post'
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router'

const HomeScreen = () => {
  const { brandPrimary, brandPrimaryTap, backgroundColor, lightGray } = useColor();
  const [postsList, setPosts] = useState<PostResponseModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const defaultPosts: PostResponseModel[] = [
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
        privacy: "public",
        status: true,
        mediaUrl: [
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-4.jpg', status: true },
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/video/upload/v1712331864/samples/sea-turtle.mp4', status: true },
          { postID: '1', mediaUrl: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331883/cld-sample-3.jpg', status: true }
        ]
      },
      content: "Post nè hehehehe",
      likeCount: 50,
      commentCount: 1,
      createdAt: '10 phút trước',
      privacy: "public",
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
        privacy: "public",
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
      privacy: "public",
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
  ];

  // clear posts from async storage
  const clearPosts = async () => {
    try {
      await AsyncStorage.removeItem('posts');
    } catch (error) {
      console.error("Error clearing posts:", error);
    }
  };

  const loadPosts = async () => {
    try {
      //clearPosts();
      const storedPosts = await AsyncStorage.getItem('posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        const defaultPostsList: any = JSON.stringify(defaultPosts);
        await AsyncStorage.setItem('posts', defaultPostsList);
        setPosts(defaultPosts); // No need to parse since defaultPosts is already an array
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts(defaultPosts); // Fallback to default posts on error
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts(); // Reload posts when refresh is triggered
    setRefreshing(false);
  };

  //Test nhánh

  useEffect(
    useCallback(() => {
      loadPosts();
    }, []));

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ backgroundColor: backgroundColor, paddingTop: 40 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Image
            source={require('@/assets/images/yourvibes_black.png')}
            style={{
              width: "40%",
              height: 60,
              objectFit: 'contain',
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      {/* Content */}
      <ScrollView
        style={{ flex: 1, marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} // Trigger pull-to-refresh
          />
          }
        >
          {postsList?.map((post) => (
            <Post
              key={post?.id}
              post={post}
            >
              {post?.parentPost && <Post post={post?.parentPost} isParentPost />}
            </Post>
          ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
