import { View, Text, StatusBar, TouchableOpacity, ScrollView, ToastAndroid, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useColor from '@/src/hooks/useColor';
import { router, useFocusEffect } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import NotificationItem from '../components/NotificationItem';

import { ActivityIndicator } from '@ant-design/react-native';
import NotifiCationViewModel from '../viewModel/NotifiCationViewModel';
import { defaultNotificationRepo } from '@/src/api/features/notification/NotifiCationRepo';
import { useAuth } from '@/src/context/auth/useAuth';



const NotificationScreen = () => {
  const { brandPrimary, backgroundColor, brandPrimaryTap, lightGray } = useColor();
  const { notifications, loading, fetchNotifications,  loadMoreNotifi, updateNotification,updateAllNotification } = NotifiCationViewModel(defaultNotificationRepo);
  const { localStrings } = useAuth();

  useFocusEffect(
    React.useCallback(()=>{
        fetchNotifications();
    }, [])
  )
  // Render footer (Hiển thị loading ở cuối danh sách nếu đang tải)
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={brandPrimary} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}

      <View style={{ backgroundColor: backgroundColor, paddingTop: 40 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 60, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity onPress={() => { router.back(); }}>
              <Ionicons name="arrow-back-outline" size={24} color={brandPrimary} />
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
              {localStrings.Notification.Notification}
            </Text>

          </View>
          <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={updateAllNotification}>
            <Entypo name="check" size={24} color={brandPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: '#000' }} />
      {/* content */}
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
      />

    </View>
  )
}

export default NotificationScreen