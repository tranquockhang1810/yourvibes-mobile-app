import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Tabs, Button } from '@ant-design/react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/useAuth';
import useColor from '@/src/hooks/useColor';

const ProfileScreen = () => {
  const { brandPrimary, brandPrimaryTap, backgroundColor, lightGray } = useColor();
  const { onLogout, changeLanguage, localStrings } = useAuth();
  const [seePassword, setSeePassword] = useState(false);

//   const handleLogout = () => {
//     onLogout();
//   };

const handleLogout = () => {
    Alert.alert(
      `Xác nhận`,
      `Bạn có chắc chắn muốn đăng xuất không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', onPress: onLogout }
      ]
    );
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        >

        {/* Header */}
        <View
            style={{
                marginTop: 40,
                width: '100%',
                paddingHorizontal: 16,
                paddingTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', flex: 1 }}>
              Họ tên đầy đủ của người đăng nhập
            </Text>
          </View>



          {/* Black Line Divider */}
          <View
            style={{
                width: '100%',
                height: 1, 
                backgroundColor: brandPrimary, 
            }}
          />

          {/* Cover Image */}
          <View style={{ width: '100%', height: 150, backgroundColor: lightGray }}>
            <Image
              source={{ uri: 'https://img.freepik.com/premium-photo/abstract-background-pattern-minimalistic-wave-clean-simple-modern-texture-colorful_941600-307018.jpg?w=1380' }}
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
                source={{ uri: 'https://cdn.pocket-lint.com/r/s/1200x630/assets/images/160499-homepage-news-feature-how-to-use-avatars-in-zoom-be-a-dog-or-a-fox-in-your-next-call-image1-m29p6ajuhp.png' }}
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
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Họ tên đầy đủ của người đăng nhập</Text>
            <Text style={{ color: 'gray', marginTop: 4 }}>Mô tả</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}>999 Bài viết</Text>
              <Text style={{ marginHorizontal: 20, fontWeight: 'bold' }}>435 Bạn bè</Text>
            </View>
          </View>

          {/* Tabs Section */}
          <View style={{ width: '100%', marginTop: 20 }}>
            <Tabs
              tabs={[
                { title: 'Bài viết' },
                { title: 'Giới thiệu' },
                { title: 'Cài đặt trang cá nhân' },
              ]}
              initialPage={0}
              tabBarPosition="top"
            >
              {/* Bài viết */}
              <View style={{ padding: 16 }}>
                {/* Post Input Section */}
                <View
                  style={{
                    width: '100%',
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    backgroundColor: backgroundColor, 
                    borderWidth: 1,
                    borderColor: lightGray,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: 'https://cdn.pocket-lint.com/r/s/1200x630/assets/images/160499-homepage-news-feature-how-to-use-avatars-in-zoom-be-a-dog-or-a-fox-in-your-next-call-image1-m29p6ajuhp.png' }}
                    style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: lightGray }}
                  />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text>Họ tên đầy đủ (của người đăng nhập)</Text>
                    <Text style={{ color: 'gray' }}>Hôm nay bạn thế nào?</Text>
                  </View>
                </View>
                <Text>Bài viết nội dung sẽ hiển thị ở đây.</Text>
              </View>

              {/* Giới thiệu */} 
              <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Chi tiết</Text>

                  
                    {/* Email */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialIcons name="email" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Email: <Text style={{ fontWeight: 'bold' }}>Sample@test.com</Text></Text>
                    </View>

                    {/* Số điện thoại */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Feather name="phone" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Số điện thoại: <Text style={{ fontWeight: 'bold' }}>0912345678</Text></Text>
                    </View>

                    {/* Ngày sinh */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Feather name="calendar" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Ngày sinh: <Text style={{ fontWeight: 'bold' }}>23/01/2000</Text></Text>
                    </View>

                    {/* Ngày hoạt động */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <MaterialIcons name="date-range" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Ngày hoạt động: <Text style={{ fontWeight: 'bold' }}>20/09/2024</Text></Text>
                    </View>

              </View>


              {/* Cài đặt trang cá nhân */}
              <View style={{ padding: 16, alignItems: 'center' }}>
              <Button
                    type="primary"
                    onPress={handleLogout}
                >
                    Đăng xuất
                </Button>
                <Button
                    type="primary"
                    onPress={() => changeLanguage()}
                    style={{ marginTop: 10 }}
                >
                    {localStrings.Public.Language}
                </Button>
              </View>
            </Tabs>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
