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
import { Privacy } from '@/src/api/baseApiResponseModel/baseApiResponseModel'
import ProfileViewModel from '../../profile/viewModel/ProfileViewModel'

const HomeScreen = () => {
  const { brandPrimary, brandPrimaryTap, backgroundColor, lightGray } = useColor();
  const [postsList, setPosts] = useState<PostResponseModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  // const {
  //   fetchUserPostsForHome,
  //   posts
  // } = ProfileViewModel()

  // useEffect(() => {
  //   fetchUserPostsForHome();
  // }, [])

  const defaultPosts: PostResponseModel[] = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Trần Quốc Khang',
        avatar_url: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331876/samples/look-up.jpg',
      },
      parent_post: {
        id: '2',
        user: {
          id: '2',
          name: 'Nguyễn Lê Anh Huy',
          avatar_url: 'https://i.pravatar.cc/300',
        },
        content: "Mới đi ăn về",
        like_count: 100,
        comment_count: 12,
        created_at: '10 phút trước',
        privacy: Privacy.PUBLIC,
        status: true,
        media: [
          { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-4.jpg', status: true },
          { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/video/upload/v1712331864/samples/sea-turtle.mp4', status: true },
          { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331883/cld-sample-3.jpg', status: true }
        ]
      },
      content: "Post nè hehehehe",
      like_count: 50,
      comment_count: 1,
      created_at: '10 phút trước',
      privacy: Privacy.PUBLIC,
      status: true,
      media: [
        { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-4.jpg', status: true },
        { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/image/upload/v1712331884/cld-sample-5.jpg', status: true },
        { post_id: '1', media_url: 'https://res.cloudinary.com/dfqgxpk50/video/upload/v1727932039/bandicam_2024-05-18_14-56-58-243_tl8tsq.mp4', status: true }
      ]
    },
    {
      id: '2',
      user: {
        id: '3',
        name: 'Nguyễn Văn A',
        avatar_url: 'https://i.pravatar.cc/301',
      },
      parent_post: {
        id: '4',
        user: {
          id: '4',
          name: 'Lê Văn B',
          avatar_url: 'https://i.pravatar.cc/301',
        },
        content: "Vừa chạy bộ về",
        like_count: 110,
        comment_count: 15,
        created_at: '20 phút trước',
        privacy: Privacy.PUBLIC,
        status: true,
        media: [
          {
            "media_url": "https://loremflickr.com/640/480/city",
            "status": true,
            "post_id": "1"
          },
          {
            "media_url": "https://loremflickr.com/640/480/city",
            "status": false,
            "post_id": "2"
          },
          {
            "media_url": "https://loremflickr.com/640/480/city",
            "status": true,
            "post_id": "3"
          },
        ]
      },
      content: "Trời hôm nay đẹp quá",
      like_count: 55,
      comment_count: 3,
      created_at: '15 phút trước',
      privacy: Privacy.PUBLIC,
      status: true,
      media: [
        {
          "media_url": "https://loremflickr.com/640/480/city",
          "status": true,
          "post_id": "4"
        },
        {
          "media_url": "https://loremflickr.com/640/480/city",
          "status": false,
          "post_id": "5"
        },
      ]
    },
  ];

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
          />
          }
        >
          {postsList?.map((post) => (
            <Post
              key={post?.id}
              post={post}
            >
              {post?.parent_post && <Post post={post?.parent_post} isParentPost />}
            </Post>
          ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
