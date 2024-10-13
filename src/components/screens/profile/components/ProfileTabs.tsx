import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Tabs, Button, Modal,ActionSheet  } from '@ant-design/react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/useAuth';
import useColor from '@/src/hooks/useColor';
import { Image } from 'react-native'; 
import { useRouter } from 'expo-router';


const ProfileTabs = () => {
  const { brandPrimary, backgroundColor, lightGray } = useColor();
  const { onLogout, changeLanguage, localStrings } = useAuth(); 
  const router = useRouter(); 
  const AddPostScreen: () => React.JSX.Element = () => <AddPostScreen />;

  const handleLogout = () => {
    Modal.alert(
      localStrings.Public.Confirm,
      localStrings.Public.LogoutConfirm,
      [
        { text: localStrings.Public.Cancel, style: 'cancel' },
        { text: localStrings.Public.Confirm, onPress: onLogout },
      ]
    );
  };

  const showLanguageOptions = () => {
    const options = [
      localStrings.Public.English,
      localStrings.Public.Vietnamese,
      localStrings.Public.Cancel,
    ];
    
    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1, 
      },
      (buttonIndex) => {
        if (buttonIndex === 0) { 
          changeLanguage();
        } else if (buttonIndex === 1) { 
          changeLanguage();
        }
      }
    );
  };

  const friends = Array.from({ length: 8 }, (_, index) => `${localStrings.Public.Friend} ${index + 1}`);
 
  

  // Kiểm tra xem người dùng có phải là chủ sở hữu không
  // const isCurrentUserProfile = (profileUserId) => {
  //   return profileUserId === currentUser.id;
  // };
  


  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Tabs
        tabs={[
          { title: localStrings.Public.About },
          { title: localStrings.Public.Post },
          { title: localStrings.Public.SetingProfile },
          //{ title: isCurrentUserProfile(profileUserId) ? localStrings.Public.SetingProfile : localStrings.Public.More },
        ]}
        initialPage={0}
        tabBarPosition="top"
      >
         {/* Giới thiệu */}
         <View style={{ padding: 20, flex: 1 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                  
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{localStrings.Public.Detail}</Text>

                {/* Email */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <MaterialIcons name="email" size={24} color="black" />
                  <Text style={{ marginLeft: 10 }}>{localStrings.Public.Mail} <Text style={{ fontWeight: 'bold' }}>Sample@test.com</Text></Text>
                </View>

                {/* Số điện thoại */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Feather name="phone" size={24} color="black" />
                  <Text style={{ marginLeft: 10 }}>{localStrings.Public.Phone} <Text style={{ fontWeight: 'bold' }}>0912345678</Text></Text>
                </View>

                {/* Ngày sinh */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Feather name="calendar" size={24} color="black" />
                  <Text style={{ marginLeft: 10 }}>{localStrings.Public.Birthday} <Text style={{ fontWeight: 'bold' }}>23/01/2000</Text></Text>
                </View>

                {/* Ngày hoạt động */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <MaterialIcons name="date-range" size={24} color="black" />
                  <Text style={{ marginLeft: 10 }}>{localStrings.Public.Active} <Text style={{ fontWeight: 'bold' }}>20/09/2024</Text></Text>
                </View>

                {/* Danh sách bạn bè */}
                <View style={{ padding: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{localStrings.Public.Friend}</Text>
                      <Text>435 {localStrings.Public.Friend}</Text>
                    </View> 
                    <TouchableOpacity onPress={() => { /* Xử lý tìm bạn bè */ }}>
                      <Text style={{ alignSelf: 'flex-end' , color: 'blue' }}>{localStrings.Public.FriendFind}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {friends.map((friend, index) => (
                      <View key={index} style={{ width: '23%', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{
                          width: 60, height: 60, borderRadius: 30, backgroundColor: lightGray,
                          justifyContent: 'center', alignItems: 'center'
                        }}> 
                        </View>
                        <Text style={{ marginTop: 5 }}>{friend}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity onPress={() => { /* Xử lý xem tất cả bạn bè */ }}>
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'blue' }}>{localStrings.Public.FriendView}</Text>
                  </TouchableOpacity>
                </View>

                </ScrollView>
              </View>

            {/* Bài viết */}
            <ScrollView style={{ padding: 16 }}>  
                 {/* Post Input Section */}  
                 <TouchableOpacity
                    onPress={() => router.push({ pathname: '/add' })}
                    >
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
                      source={{ uri: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg' }}
                      style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: lightGray }}
                    />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text>{localStrings.Public.Username}</Text>
                      <Text style={{ color: 'gray' }}>{localStrings.Public.Today}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                  {/* Nội dung bài viết */}
                  <Text style={{ padding: 20, fontSize: 18, fontWeight: 'bold' }}>Các bài viết hiển thị ở đây</Text> 

              </ScrollView>

        {/* Cài đặt trang cá nhân PROFILE SETTING */}
        {/* {isCurrentUserProfile(profileUserId) ? ( */}
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Button
              type="primary"
              onPress={() => {
                // Handle Edit Profile action here
              }}
              style={{backgroundColor: backgroundColor }}
            >
            <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.EditProfile}</Text>
            </Button>
            <Button
              type="primary"
              onPress={() => {
                // Handle Change Password action here
              }}
              style={{ marginVertical: 10, backgroundColor: backgroundColor }}
            >
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ChangePassword}</Text>
            </Button>
            <Button type="primary" onPress={showLanguageOptions} style={{ backgroundColor: backgroundColor }}>
              <Text style={{ color: brandPrimary, fontSize: 16 }}>{localStrings.Public.Language}</Text>
            </Button>
            <Button type="primary" onPress={handleLogout} style={{ marginTop: 10, backgroundColor: backgroundColor }}>
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.LogOut}</Text>
            </Button>
          </ScrollView>
        </View>

      {/* ) : ( */}

        {/* Xem Thêm MORE */}
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Button
              type="primary"
              onPress={() => {
                // Handle ADD FRIEND action here
              }}
              style={{backgroundColor: backgroundColor }}
            >
            <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.AddFriend}</Text>
            </Button>
            <Button
              type="primary"
              onPress={() => {
                // Handle REPORT action here
              }}
              style={{ marginVertical: 10, backgroundColor: backgroundColor }}
            >
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ChangePassword}</Text>
            </Button>
             <Button type='primary'
             onPress={() => {
              // Handle BLOCK action here
             }}
             style={{ backgroundColor: backgroundColor }}>
              <Text style={{color: brandPrimary, fontSize: 16}}>{localStrings.Public.ReportFriend}</Text>
            </Button>
          </ScrollView>
        </View>
        {/* )} */}
      </Tabs>
    </View>
  );
};

export default ProfileTabs;
