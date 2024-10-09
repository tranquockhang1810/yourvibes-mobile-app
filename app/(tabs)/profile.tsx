import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '@/src/context/useAuth';
import { Button } from '@ant-design/react-native';

const Profile = () => {
  const { onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button
        type="primary"
        onPress={handleLogout}
      >
        Đăng xuất
      </Button>
    </View>
  );
};

export default Profile;
