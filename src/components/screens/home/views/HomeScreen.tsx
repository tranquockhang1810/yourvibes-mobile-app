import {
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  FlatList
} from 'react-native'
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useState } from 'react'
import useColor from '@/src/hooks/useColor'
import Post from '@/src/components/common/Post'
import { ActivityIndicator } from '@ant-design/react-native'
import HomeViewModel from '../viewModel/HomeViewModel'
import { defaultNewFeedRepo } from '@/src/api/features/newFeed/NewFeedRepo'

const HomeScreen = () => {
  const { brandPrimary, brandPrimaryTap, backgroundColor, lightGray } = useColor();
  const { loading, newFeeds, fetchNewFeeds, loadMoreNewFeeds } = HomeViewModel(defaultNewFeedRepo)
  const [refreshing, setRefreshing] = useState(false);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={brandPrimary} />
      </View>
    );
  };

  useEffect(() => {
    fetchNewFeeds();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ backgroundColor: backgroundColor, paddingTop: 40 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Image
            source={require('@/assets/images/yourvibes_black.png')}
            style={{
              width: "50%",
              height: 60,
            }}
            contentFit="contain"
          />
        </View>
      </View>
      {/* Content */}
      <FlatList
        data={newFeeds}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item?.id as string}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreNewFeeds}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchNewFeeds}
        refreshing={loading}
      />
    </View>
  )
}

export default HomeScreen;