import React from 'react';
import { View, Text, ScrollView ,TouchableOpacity} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'; 
import useColor from '@/src/hooks/useColor'; 

interface AboutTabProps {
  user: any;
  localStrings: any;
}

const { brandPrimary, backgroundColor, lightGray } = useColor();
const AboutTab: React.FC<AboutTabProps> = ({ user, localStrings }) => {
  const friends = Array.from({ length: 8 }, (_, index) => `${localStrings.Public.Friend} ${index + 1}`);
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{localStrings.Public.Detail}</Text>

        {/* Email */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <MaterialIcons name="email" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>
            {localStrings.Public.Mail}: <Text style={{ fontWeight: 'bold' }}>{user?.email || 'N/A'}</Text>
          </Text>
        </View>

        {/* Số điện thoại */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Feather name="phone" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>
            {localStrings.Public.Phone}: <Text style={{ fontWeight: 'bold' }}>{user?.phone_number || 'N/A'}</Text>
          </Text>
        </View>

        {/* Ngày sinh */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Feather name="calendar" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>
            {localStrings.Public.Birthday}: <Text style={{ fontWeight: 'bold' }}>{user?.birthday || 'N/A'}</Text>
          </Text>
        </View>

        {/* Ngày tham gia */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>
            {localStrings.Public.Active}: <Text style={{ fontWeight: 'bold' }}>{user?.created_at || 'N/A'}</Text>
          </Text>
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
  );
};

export default AboutTab;
