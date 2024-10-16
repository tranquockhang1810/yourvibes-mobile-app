import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';
import AboutTab from './AboutTab';
import SettingsTab from './SettingsTab';
import { loadPostsFromStorage, defaultPosts } from './ProfileTabsHelper';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import PostList from './PostList';

const ProfileTabs: React.FC = () => {
  const { brandPrimary } = useColor();
  const { localStrings } = useAuth();
  const [posts, setPosts] = useState<PostResponseModel[]>([]);
  const [tab, setTab] = useState(0);

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

  const renderBody = useCallback(() => {
    switch (tab) {
      case 0:
        return <AboutTab />;
      case 1:
        return <PostList />;
      case 2:
        return <SettingsTab />;
      default:
        return <AboutTab />;
    }
  }, [tab, posts]);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Tabs
        tabs={[
          { title: localStrings.Public.About },
          { title: localStrings.Public.Post },
          { title: localStrings.Public.SetingProfile },
        ]}
        initialPage={tab}
        tabBarPosition="top"
        tabBarActiveTextColor={brandPrimary}
        onChange={(_, index) => setTab(index)}
        animated={false}
        style={{ height: '100%' }}
      />
      {renderBody()}
    </View>
  );
};

export default ProfileTabs;
