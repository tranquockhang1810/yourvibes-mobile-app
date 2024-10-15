import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useAuth } from '@/src/context/useAuth';
import { useRouter } from 'expo-router';
import { defaultAuthenRepo } from '@/src/api/features/authenticate/AuthenRepo';

const ProfileViewModel = () => {
  const { backgroundColor } = useColor();
  const { user, localStrings } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();  

  // Hàm gọi API lấy thông tin hồ sơ
  const fetchProfile = async () => {
    if (!user || !user.id) {
      console.error("User is not logged in or has no ID");
      return;
    }
    try {
      const response = await defaultAuthenRepo.profile({ id: user.id });
      setProfile(response.data); // Lưu thông tin hồ sơ
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally { 
    }
  };

  // Gọi API khi trang được tải
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        {/* Header Cố Định */}
        <View
          style={{
            position: 'absolute',
            marginTop: 30,
            top: 0,
            left: 0,
            right: 0,
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
            {profile?.family_name} {profile?.name || localStrings.Public.Username}
          </Text>
        </View>

        {/* Nội dung cuộn bên dưới */}
        <ScrollView
          style={{ width: '100%', marginTop: 60 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 20 }}
        >
          {/* Các thành phần khác */}
          <ProfileHeader profile={profile} />
          <ProfileTabs />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileViewModel;
