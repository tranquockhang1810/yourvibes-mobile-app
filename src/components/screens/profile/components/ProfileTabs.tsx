import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';
import AboutTab from './AboutTab';
import SettingsTab from './SettingsTab';
import PostList from './PostList';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';

const ProfileTabs = ({
  tab,
  setTab,
  posts,
  loading,
  loadMorePosts
}: {
  tab: number,
  setTab: (number: number) => void,
  posts: PostResponseModel[],
  loading: boolean,
  loadMorePosts: () => void
}) => {
  const { brandPrimary } = useColor();
  const { localStrings } = useAuth();

  const renderBody = useCallback(() => {
    switch (tab) {
      case 0:
        return <AboutTab />;
      case 1:
        return <PostList posts={posts} loading={loading} loadMorePosts={loadMorePosts} />;
      case 2:
        return <SettingsTab />;
      default:
        return <AboutTab />;
    }
  }, [tab, posts, loading]);

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
