import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useAuth } from '@/src/context/auth/useAuth';
import { useRouter } from 'expo-router';
import ProfileViewModel from '../viewModel/ProfileViewModel';
import { UserModel } from '@/src/api/features/authenticate/model/LoginModel';

const ProfileFeatures = ({ tab }: { tab: number }) => {
  const { backgroundColor } = useColor();
  const { user, localStrings } = useAuth();
  const router = useRouter();
  const { loading, posts, fetchUserPosts, loadMorePosts, total } = ProfileViewModel();

  useEffect(() => {
    if (tab === 0 || tab === 1) {
      fetchUserPosts();
    }
  }, [tab]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        {/* Header Cố Định */}
        <View
          style={{
            marginTop: 30,
            height: 50,
            paddingHorizontal: 16,
            paddingTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            zIndex: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', flex: 1 }}>
            {user?.family_name} {user?.name || localStrings.Public.Username}
          </Text>
        </View>

        {/* Content */}
        <FlatList
          data={null}
          ListHeaderComponent={
            <>
              <ProfileHeader total={total} user={user as UserModel} loading={false} />
              <ProfileTabs tabNum={tab} posts={posts} loading={loading} profileLoading={false} loadMorePosts={loadMorePosts} userInfo={user as UserModel} friendCount={0}/>
            </>
          }
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          onRefresh={() => (tab === 0 || tab === 1) && fetchUserPosts()}
          refreshing={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileFeatures;
