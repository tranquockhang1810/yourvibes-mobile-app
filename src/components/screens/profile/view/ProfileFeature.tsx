import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useAuth } from '@/src/context/auth/useAuth';
import { useFocusEffect, useRouter } from 'expo-router';
import ProfileViewModel from '../viewModel/ProfileViewModel';

const ProfileFeatures = () => {
  const { backgroundColor } = useColor();
  const { user, localStrings } = useAuth();
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { loading, posts, fetchUserPosts, loadMorePosts, total } = ProfileViewModel();

  useEffect(() => {
    fetchUserPosts();
  }, [])

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
          <TouchableOpacity onPress={() => router.push({ pathname: '/home' })}>
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
              <ProfileHeader total={total} />
              <ProfileTabs setTab={setTab} tab={tab} posts={posts} loading={loading} loadMorePosts={loadMorePosts} />
            </>
          }
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          onRefresh={() => tab === 1 && fetchUserPosts()}
          refreshing={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileFeatures;
