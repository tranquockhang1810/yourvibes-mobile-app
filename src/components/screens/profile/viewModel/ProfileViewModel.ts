import { Alert } from 'react-native';

const ProfileViewModel = () => {

  const handleLogout = () => {
    Alert.alert( 
      'Xác nhận',
      'µn có chắc chắn muốn đăng xuất',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', onPress: () => console.log('Đăng xuất') },
      ]
    );
  };

  return {
    handleLogout
  }
}

export default ProfileViewModel