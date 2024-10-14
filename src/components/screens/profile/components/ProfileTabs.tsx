import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { Tabs, Modal, ActionSheet } from '@ant-design/react-native';
import { useAuth } from '@/src/context/useAuth';
import useColor from '@/src/hooks/useColor';
import { useRouter } from 'expo-router';
import Post from '@/src/components/common/Post';
import AboutTab from './AboutTab';
import SettingsTab from './SettingsTab';
import { loadPostsFromStorage, defaultPosts } from './ProfileTabsHelper';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

const ProfileTabs: React.FC = () => {
  const { brandPrimary, backgroundColor, lightGray, brandPrimaryTap } = useColor();
  const { user, onLogout, changeLanguage, localStrings } = useAuth();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<PostResponseModel[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = useCallback(async () => {
    try {
      const storedPosts = await loadPostsFromStorage();
      setPosts(storedPosts || defaultPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts(defaultPosts);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  // Đăng xuất, điều hướng đến trang đăng nhập
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
            router.replace('/login');
          },
        },
      ]
    );
  };

  // Hiển thị tuỳ chọn ngôn ngữ
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
        if (buttonIndex === 0 || buttonIndex === 1) {
          changeLanguage();
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Tabs
        tabs={[
          { title: localStrings.Public.About },
          { title: localStrings.Public.Post },
          { title: localStrings.Public.SetingProfile },
        ]}
        initialPage={0}
        tabBarPosition="top"
        tabBarActiveTextColor={brandPrimary}
      >
        {/* Tab Giới Thiệu */}
        <AboutTab user={user} localStrings={localStrings} />

        {/* Tab Bài Viết */}
        <View style={{ flex: 1 , padding: 8}}>
          {/* Post Input Section */}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/add' })}  // Điều hướng đến trang thêm bài viết
          >
            <View
              style={{
                width: '100%',
                padding: 10,
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
                <Text>{localStrings.Public.Username}</Text>
                <Text style={{ color: 'gray' }}>{localStrings.Public.Today}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Danh sách bài viết */}
          <ScrollView
            style={{ }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  // Tích hợp chức năng refresh
          >
            {posts.map((post) => (
              <Post key={post.id} post={post} />  // Hiển thị từng bài viết bằng component Post
            ))}
          </ScrollView>
        </View>

        {/* Tab Cài Đặt */}
        <SettingsTab
          user={user}
          onLogout={handleLogout}
          showLanguageOptions={showLanguageOptions}
          localStrings={localStrings}
        />
      </Tabs>
    </View>
  );
};

export default ProfileTabs;
