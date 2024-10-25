import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';

const ProfileHeader = ({ total }: { total: number }) => {
  const { brandPrimary, backgroundColor, lightGray } = useColor();
  const { localStrings, language } = useAuth();
  const { user } = useAuth(); // Lấy thông tin người dùng

  return (
    <>
      {/* Cover Image */}
      <View style={{ width: '100%', height: 200, backgroundColor: lightGray }}>
        <Image
          source={{ uri: user?.capwall_url }}
          style={{ width: '100%', height: '100%', backgroundColor: lightGray }}
        />
      </View>

      {/* Profile Image */}
      <View style={{ alignItems: 'center', marginTop: -60 }}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: user?.avatar_url }}
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: lightGray }}
          />
        </View>
      </View>
      {/* User Information */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {user?.family_name} {user?.name || localStrings.Public.Username}</Text>
        <Text style={{ color: 'gray', marginTop: 4 }}>{user?.biography || localStrings.Public.Biography}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}> {total || user?.post_count} {localStrings.Public.Post}{language === 'en' && (total || user?.post_count) && (total && total > 1 || user?.post_count && user?.post_count > 1) ? 's' : ''}</Text>
          <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}> {user?.friend_count} {localStrings.Public.Friend}{language === 'en' && user?.friend_count && user?.friend_count > 1 ? 's' : ''}</Text>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;