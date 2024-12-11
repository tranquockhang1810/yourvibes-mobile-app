import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';
import AboutTab from './AboutTab';
import SettingsTab from './SettingsTab';
import PostList from './PostList';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import { UserModel } from '@/src/api/features/authenticate/model/LoginModel';
import { FriendResponseModel } from '@/src/api/features/profile/model/FriendReponseModel';

const ProfileTabs = ({
  tabNum,
  posts,
  loading,
  profileLoading,
  loadMorePosts,
  userInfo,
  friendCount,
  friends,
  resultCode,
}: {
  tabNum: number,
  posts: PostResponseModel[],
  loading: boolean,
  profileLoading: boolean,
  loadMorePosts: () => void,
  userInfo: UserModel,
  friendCount: number,
  friends:FriendResponseModel[];
  resultCode: number;
}) => {
  const { brandPrimary } = useColor();
  const { localStrings, user } = useAuth();
  const [tab, setTab] = React.useState(tabNum);

  const tabs = useMemo(() => {
    if (userInfo?.id === user?.id) {
      return [
        { title: localStrings.Public.About },
        { title: localStrings.Public.Post },
        { title: localStrings.Public.SetingProfile },
      ]
    } else {
      return [
        { title: localStrings.Public.About },
        { title: localStrings.Public.Post },
      ]
    }
  }, [tabNum, localStrings, user, userInfo]);

  const renderBody = useCallback(() => {
    switch (tab) {
      case 0:
        return <AboutTab user={userInfo} loading={profileLoading} friendCount={friendCount} friends={friends} resultCode={resultCode} />;
      case 1:
        return <PostList posts={posts} loading={loading} loadMorePosts={loadMorePosts} user={userInfo}/>;
      case 2:
        return userInfo?.id === user?.id ? <SettingsTab /> : null;
      default:
        return <AboutTab user={userInfo} loading={profileLoading} friendCount={friendCount} friends={friends} resultCode={resultCode}/>;
    }
  }, [tab, posts, loading, profileLoading, userInfo, friendCount, user]);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Tabs
        tabs={tabs}
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