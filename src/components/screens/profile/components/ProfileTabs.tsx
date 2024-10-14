import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
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
  const { brandPrimary } = useColor();
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
      console.error("Error loading posts:", error);
      setPosts(defaultPosts);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  //LOGOUT CHÍNH ĐỂ XÓA ID NGƯỜI ĐĂNG NHẬP
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

  //LOGOUT TEST ĐỂ BACK RA LOGIN
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
        <ScrollView
          style={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ScrollView>

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