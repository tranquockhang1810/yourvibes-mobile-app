import { View, Text, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { useMessageViewModel } from '../viewModel/MessagesViewModel';
import { ListView } from '@ant-design/react-native';
import MessagerItem from '../component/MessagesItem';
import useColor from '@/src/hooks/useColor';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const MessagesFeature = () => {
    const {user} = useAuth();
    const {backgroundColor, brandPrimary} = useColor();
    const {localStrings} = useAuth();
    const friends = [
        { name: 'Nguyễn Văn A', avatar: 'https://thumbs.dreamstime.com/b/avatar-icon-avatar-flat-symbol-isolated-white-avatar-icon-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-124920496.jpg', lastOnline: new Date() },
        { name: 'Trần Thị B', avatar: 'https://thumbs.dreamstime.com/b/avatar-icon-avatar-flat-symbol-isolated-white-avatar-icon-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-124920496.jpg', lastOnline: new Date(Date.now() - 5 * 60000) } // 5 minutes ago
    ];

    const { newMessage, setNewMessage, activeFriend, setActiveFriend, messages, replyTo, setReplyTo, handleAddReaction, handleSendMessage, messagesEndRef } = useMessageViewModel(user, friends);
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}

      <View style={{ backgroundColor: backgroundColor, paddingTop: Platform.OS === 'ios' ? 30 : 0 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity onPress={() => { router.back(); }}>
              <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
              {localStrings.Messages.Messages}
            </Text>

          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: '#000' }} />
      <MessagerItem />
      {/* content */}
      {/* {notifications.length > 0 ? (  
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item}
          onUpdate={() => updateNotification(item)}
        />}
        keyExtractor={(item) => item?.id as string}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreNotifi}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchNotifications(1)}
        refreshing={loading}
      />):( 
        // loading ? (
        //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <ActivityIndicator size="large" color={brandPrimary} />
        //   </View>
        // ) :
        // (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        // <Text style={{ fontSize: 16, color: '#333' }}>{localStrings.Notification.NoNotification}</Text>
        // </View>)
      )} */}

      <Toast />
    </View>
  )
}

export default MessagesFeature