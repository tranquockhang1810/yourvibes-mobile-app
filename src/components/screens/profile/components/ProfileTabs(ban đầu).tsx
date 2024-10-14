import React, { useEffect,useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Tabs, Button, Modal,ActionSheet  } from '@ant-design/react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/useAuth';
import useColor from '@/src/hooks/useColor';
import { Image } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { defaultAuthenRepo } from "@/src/api/features/authenticate/AuthenRepo";
import { ProfileResponseModel } from "@/src/api/features/authenticate/model/ProfileModel";
import { createContext, useContext, useState } from 'react';
import Post from '@/src/components/common/Post'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

const ProfileTabs = () => {
  const { brandPrimary, backgroundColor, lightGray } = useColor();
  const { user, onLogout, changeLanguage, localStrings } = useAuth(); 
  const router = useRouter(); 
  const AddPostScreen: () => React.JSX.Element = () => <AddPostScreen />;

  

  // const handleLogout = () => {
  //   Modal.alert(
  //     localStrings.Public.Confirm,
  //     localStrings.Public.LogoutConfirm,
  //     [
  //       { text: localStrings.Public.Cancel, style: 'cancel' },
  //       { text: localStrings.Public.Confirm, onPress: onLogout },
  //     ]
  //   );
  // };
  const handleLogout = () => {
    Modal.alert(
      localStrings.Public.Confirm,
      localStrings.Public.LogoutConfirm,
      [
        { text: localStrings.Public.Cancel, style: 'cancel' },
        { 
          text: localStrings.Public.Confirm, 
          onPress: () => {
            onLogout(); 
            router.replace('/login');  // Điều hướng về trang đăng nhập sau khi đăng xuất
          } 
        },
      ]
    );
  };
  

  const showLanguageOptions = () => {
    const options = [
      localStrings.Public.English,
      localStrings.Public.Vietnamese,
      localStrings.Public.Cancel,
    ];
    
    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1, 
      },
      (buttonIndex) => {
        if (buttonIndex === 0) { 
          changeLanguage();
        } else if (buttonIndex === 1) { 
          changeLanguage();
        }
      }
    );
  };

  const friends = Array.from({ length: 8 }, (_, index) => `${localStrings.Public.Friend} ${index + 1}`);
 
  
  //POST
  const [refreshing, setRefreshing] = useState(false);  
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [postsList, setPostsList, ] = useState<PostResponseModel[]>([]);  
    const clearPosts = async () => {
      try {
        await AsyncStorage.removeItem('posts');
      } catch (error) {
        console.error("Error clearing posts:", error);
      }
    };
    useEffect(() => {
      setPostsList(posts);
    }, []);
    

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
          privacy: 'Public',
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
    ];
    
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

    useEffect(
      useCallback(() => {
        loadPosts();
      }, []));


  // Kiểm tra xem người dùng có phải là chủ sở hữu không
  // const isCurrentUserProfile = (profileUserId) => {
  //   return profileUserId === currentUser.id;
  // };
  


  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Tabs
        tabs={[
          { title: localStrings.Public.About },
          { title: localStrings.Public.Post },
          { title: localStrings.Public.SetingProfile },
          //{ title: isCurrentUserProfile(profileUserId) ? localStrings.Public.SetingProfile : localStrings.Public.More },
        ]}
        initialPage={0}
        tabBarPosition="top"
      >
         {/* Giới thiệu */}
         <View style={{ padding: 20, flex: 1 }}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{localStrings.Public.Detail}</Text>

              {/* Email */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <MaterialIcons name="email" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>
                  {localStrings.Public.Mail}: <Text style={{ fontWeight: 'bold' }}>{  user?.email ||  'N/A'} </Text>
                </Text>
              </View>

              {/* Số điện thoại */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Feather name="phone" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>
                  {localStrings.Public.Phone}: <Text style={{ fontWeight: 'bold' }}>{ user?.phone_number || 'N/A'} </Text>
                </Text>
              </View>

              {/* Ngày sinh */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Feather name="calendar" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>
                  {localStrings.Public.Birthday}: <Text style={{ fontWeight: 'bold' }}>{user?.birthday || 'N/A'} </Text>
                </Text>
              </View>
 
              {/* Ngày tham gia */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <MaterialIcons name="date-range" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>
                  {localStrings.Public.Active}: <Text style={{ fontWeight: 'bold' }}>{ user?.created_at || 'N/A'}</Text>
                </Text>
              </View>

                {/* Danh sách bạn bè */}
                <View style={{ padding: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{localStrings.Public.Friend}</Text>
                      <Text>435 {localStrings.Public.Friend}</Text>
                    </View> 
                    <TouchableOpacity onPress={() => { /* Xử lý tìm bạn bè */ }}>
                      <Text style={{ alignSelf: 'flex-end' , color: 'blue' }}>{localStrings.Public.FriendFind}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {friends.map((friend, index) => (
                      <View key={index} style={{ width: '23%', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{
                          width: 60, height: 60, borderRadius: 30, backgroundColor: lightGray,
                          justifyContent: 'center', alignItems: 'center'
                        }}> 
                        </View>
                        <Text style={{ marginTop: 5 }}>{friend}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity onPress={() => { /* Xử lý xem tất cả bạn bè */ }}>
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'blue' }}>{localStrings.Public.FriendView}</Text>
                  </TouchableOpacity>
                </View>

                </ScrollView>
              </View>

            {/* Bài viết */}
            <ScrollView style={{ padding: 16 }}>  
                 {/* Post Input Section */}  
                 <TouchableOpacity
                    onPress={() => router.push({ pathname: '/add' })}
                    >
                 <View
                    style={{
                      width: '100%',
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      backgroundColor: backgroundColor,
                      borderWidth: 1,
                      borderColor: lightGray,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{ uri: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg' }}
                      style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: lightGray }}
                    />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text>{localStrings.Public.Username}</Text>
                      <Text style={{ color: 'gray' }}>{localStrings.Public.Today}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                   
                    {postsList?.map((post) => (
                      <Post
                        key={post?.id}
                        post={post}
                      >
                        {post?.parentPost && <Post post={post?.parentPost} isParentPost />}
                      </Post>
                    ))} 
                  
              </ScrollView>

        {/* Cài đặt trang cá nhân PROFILE SETTING */}
        {/* {isCurrentUserProfile(profileUserId) ? ( */}
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Button
              type="primary"
              onPress={() => {
                // Handle Edit Profile action here
              }}
              style={{backgroundColor: backgroundColor }}
            >
            <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.EditProfile}</Text>
            </Button>
            <Button
              type="primary"
              onPress={() => {
                // Handle Change Password action here
              }}
              style={{ marginVertical: 10, backgroundColor: backgroundColor }}
            >
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ChangePassword}</Text>
            </Button>
            <Button type="primary" onPress={showLanguageOptions} style={{ backgroundColor: backgroundColor }}>
              <Text style={{ color: brandPrimary, fontSize: 16 }}>{localStrings.Public.Language}</Text>
            </Button>
            <Button type="primary" onPress={handleLogout} style={{ marginTop: 10, backgroundColor: backgroundColor }}>
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.LogOut}</Text>
            </Button>
          </ScrollView>
        </View>

      {/* ) : ( */}

        {/* Xem Thêm MORE */}
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Button
              type="primary"
              onPress={() => {
                // Handle ADD FRIEND action here
              }}
              style={{backgroundColor: backgroundColor }}
            >
            <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.AddFriend}</Text>
            </Button>
            <Button
              type="primary"
              onPress={() => {
                // Handle REPORT action here
              }}
              style={{ marginVertical: 10, backgroundColor: backgroundColor }}
            >
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ChangePassword}</Text>
            </Button>
             <Button type='primary'
             onPress={() => {
              // Handle BLOCK action here
             }}
             style={{ backgroundColor: backgroundColor }}>
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ReportFriend}</Text>
            </Button>
          </ScrollView>
        </View>
        {/* )} */}
      </Tabs>
    </View>
  );
};

export default ProfileTabs;