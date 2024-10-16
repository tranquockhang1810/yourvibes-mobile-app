import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';

const ProfileHeader = () => {
  const { brandPrimary, backgroundColor, lightGray } = useColor();
  const { localStrings } = useAuth();
  const { user } = useAuth(); // Lấy thông tin người dùng

  return (
    <>
      {/* Cover Image */}
      <View style={{ width: '100%', height: 200, backgroundColor: lightGray }}>
        <Image
          source={{ uri: 'https://haycafe.vn/wp-content/uploads/2022/05/Background-xam-1.jpg' }}
          style={{ width: '100%', height: '100%', backgroundColor: lightGray }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: backgroundColor,
            borderRadius: 20,
            padding: 5,
          }}
        >
          <MaterialIcons name="camera-alt" size={20} color={brandPrimary} />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={{ alignItems: 'center', marginTop: -60 }}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg' }}
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: lightGray }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 10,
              backgroundColor: backgroundColor,
              borderRadius: 20,
              padding: 5,
            }}
          >
            <MaterialIcons name="camera-alt" size={20} color={brandPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* User Information */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {user?.family_name} {user?.name || localStrings.Public.Username}</Text>
        <Text style={{ color: 'gray', marginTop: 4 }}>{ user?.biography||localStrings.Public.Biography}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}> {user?.post_count} {localStrings.Public.Post}{user?.post_count && user?.post_count > 1 ? 's' : ''}</Text>
          <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}> {user?.friend_count} {localStrings.Public.Friend}{user?.friend_count && user?.friend_count > 1 ? 's' : ''}</Text>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;