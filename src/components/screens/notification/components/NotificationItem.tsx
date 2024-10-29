import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NotificationResponseModel } from '@/src/api/features/notification/models/NotifiCationModel';
import { Ionicons } from '@expo/vector-icons';
import { getTimeDiff } from '@/src/utils/helper/DateTransfer';
import { useAuth } from '@/src/context/auth/useAuth';
import { defaultPostRepo } from '@/src/api/features/post/PostRepo';

const NotificationItem = ({ notification, onUpdate }: { notification: NotificationResponseModel, onUpdate: () => void }) => {
  const { from, from_url, content, created_at, notification_type, status } = notification;
  const { user, localStrings } = useAuth();
  const [postContent, setPostContent] = useState('');

  const type = mapNotifiCationType(notification_type || '');

  useEffect(() => {
    fetchPostContent();
  }, []);

  const fetchPostContent = async () => {
    if (content) {
      try {
        const post = await defaultPostRepo.getPostById(content); // content là postId
        setPostContent(post?.data?.content || ''); // Lưu content vào state
      } catch (error) {
        console.error('Lỗi khi lấy content của bài post:', error);
      }
    }
  };

  function mapNotifiCationType(type: string) {
    switch (type) {
      case 'like_post':
        return 'like';
      case 'share_post':
        return 'share';
      case 'comment_post':
        return 'comment';
      case 'friend':
        return 'friend';
      default:
        return 'notifications';
    }
  }

  const getIcons = () => {
    switch (type) {
      case 'like':
        return 'heart-circle';
      case 'share':
        return 'arrow-redo-circle';
      case 'comment':
        return 'chatbubble-ellipses';
      case 'friend':
        return 'person-circle';
      default:
        return 'notifications';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'like':
        return '#CC0033';
      case 'share':
        return '#004073';
      case 'comment':
        return '#008800';
      case 'friend':
        return '#54473F';
      default:
        return '#000';
    }
  };

  const mapNotifiCationContent = (type: string) => {
    switch (type) {
      case 'like_post':
        return `${localStrings.Notification.Items.LikePost}`;
      case 'share_post':
        return `${localStrings.Notification.Items.SharePost}`;
      case 'comment_post':
        return `${localStrings.Notification.Items.CommentPost}`;
      case 'friend':
        return `${localStrings.Notification.Items.Friend}`;
      default:
        return 'notifications';
    }
  };

  return (
    <TouchableOpacity onPress={onUpdate} style={{ backgroundColor: status ? '#fff' : '#f0f0f0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
        <View style={{ position: 'relative' }}>
          {/* Avatar */}
          <Image
            source={{ uri: from_url }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#ccc' }}
          />
          {/* Icon hiển thị cho từng hành động */}
          <Ionicons
            name={getIcons()}
            size={20}
            color={getColor()}
            style={{ position: 'absolute', top: type === 'friend' ? 22 : 25, right: 5 }}
          />
        </View>

        {/* Nội dung thông báo */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#333' }}>
            <Text style={{ fontWeight: 'bold' }}>{from}</Text> {mapNotifiCationContent(notification_type || '')}
          </Text>
          {postContent ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 14, color: '#333' }}
            >
              {postContent}
            </Text>
          ) : null}
          <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
            {getTimeDiff(created_at, localStrings)}
          </Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: '#fff' }} />
    </TouchableOpacity>
  );
};

export default NotificationItem;
