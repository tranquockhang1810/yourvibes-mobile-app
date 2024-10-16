import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useAuth } from '@/src/context/auth/useAuth';
import { useRouter } from 'expo-router';

const ProfileViewModel = () => {
  const { backgroundColor } = useColor();
  const { user, localStrings } = useAuth();
  const router = useRouter();  

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
            {user?.family_name} {user?.name || localStrings.Public.Username}
          </Text>
        </View>

        {/* Nội dung cuộn bên dưới */}
        <ScrollView
          style={{ width: '100%', marginTop: 60 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 20 }}
        >
          {/* Các thành phần khác */}
          <ProfileHeader />
          <ProfileTabs />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileViewModel;
