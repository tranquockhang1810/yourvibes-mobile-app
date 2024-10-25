import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';
import ProfileFeatures from '@/src/components/screens/profile/view/ProfileFeature';

const Profile = () => {
  const { onLogout, changeLanguage, localStrings } = useAuth();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <ProfileFeatures />
  );
};

export default Profile;
