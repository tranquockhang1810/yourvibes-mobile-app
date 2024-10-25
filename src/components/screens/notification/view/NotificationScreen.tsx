import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import useColor from '@/src/hooks/useColor';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NotificationTabs from '../components/NotificationTabs';
import Post from '@/src/components/common/Post';
import NotificationItem, { NotificationIcon } from '../components/NotificationItem';

const NotificationScreen: React.FC = () => {
  const notifications = [
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã thích bài viết của bạn',
      content: 'Viết sơ đồ lại cho các phép lai sau ...',
      time: '7 phút trước',
      type: 'like',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã bình luận bài viết của bạn',
      content: 'Viết sơ đồ lại cho các phép lai sau ...',
      time: '9 phút trước',
      type: 'comment',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã chia sẻ bài viết của bạn',
      content: 'Viết sơ đồ lại cho các phép lai sau ...',
      time: '10 phút trước',
      type: 'share',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã chia sẻ bài viết của bạn',
      content: 'Viết sơ đồ lại cho các phép lai sau ...',
      time: '10 phút trước',
      type: 'share',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã gửi lời mời kết bạn',
      time: '10 phút trước',
      type: 'friend',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Họ tên đầy đủ',
      action: 'đã chia sẻ bài viết của bạn',
      content: 'Đây là một đoạn văn bản rất dài mà chúng ta muốn giới hạn hiển thị. Văn bản này sẽ bị cắt sau dòng thứ hai.',
      time: '10 phút trước',
      type: 'share',
    },
  ];
  const { brandPrimary, backgroundColor, brandPrimaryTap, lightGray } = useColor();
  return (
    <View style={{flex:1}}>
      {/* Header */}
            <View style={{backgroundColor: backgroundColor, paddingTop: 40 }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { router.back(); }}>
                            <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
                            Thông báo
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: '#000' }} />
            {/* content */}
            <ScrollView style={{ flex: 1,
            padding: 10,}}>
              {notifications.map((notification, index) => (
                <NotificationItem key={index} {...notification} type={notification.type as NotificationIcon}/>
              ))}
            </ScrollView>
    </View>
  )
}

export default NotificationScreen