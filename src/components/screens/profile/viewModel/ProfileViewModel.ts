import { Alert } from 'react-native';

export const handleLogout = (onLogout: () => void) => {
  Alert.alert(
    `Xác nhận`,
    `Bạn có chắc chắn muốn đăng xuất không?`,
    [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', onPress: onLogout },
    ]
  );
};

