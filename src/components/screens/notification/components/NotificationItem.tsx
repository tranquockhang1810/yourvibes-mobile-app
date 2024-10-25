import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export type NotificationIcon = 'like' | 'share' | 'comment' | 'friend'
export interface NotificationItemProps {
    avatar?: string
    name?: string
    action?: string
    content?: string
    time?: string
    type?: NotificationIcon
    }

const NotificationItem: React.FC<NotificationItemProps> = ({
    avatar,
    name,
    action,
    content,
    time,
    type,
}) => {
    const getIcons = () => {
        switch (type) {
            case 'like':
                return 'heart-circle'
            case 'share':
                return 'arrow-redo-circle'
            case 'comment':
                return 'chatbubble-ellipses'
            case 'friend':
                return 'person-add'
            default:
                return 'notifications'
        }
    }
    const getColor = () => {
        switch (type) {
          case 'like':
            return '#EE0000' // Màu đỏ cho "like"
          case 'share':
            return '#2196F3' // Màu xanh lá cho "share"
          case 'comment':
            return '#4CAF50' // Màu xanh dương cho "comment"
          case 'friend':
            return '#2196F3' // Màu vàng cho "friend"
          default:
            return '#000' // Màu đen mặc định
        }
    }
  return (
    <View>
       <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
          <View style={{position:'relative'}}>
             {/* Avatar */}
             <Image source={{ uri: avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#ccc',}} />
              {/* Icon hiển thị cho từng hành động */}
             <Ionicons name={getIcons()} size={20} color={getColor()} style={{position:'absolute', top: type === 'friend' ? 22 : 25, right:5}} />
          </View>
         
          {/* Nội dung thông báo */}
          <View style={{flex:1}}>
            <Text style={{ fontSize: 14, color: '#333',}}>
              <Text style={{fontWeight: 'bold'}}>{name}</Text> {action}{type === 'friend'?'.':':'}
            </Text>
            {content ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 14, color: '#333' }}
            >
              {content}
            </Text>
          ) : null}
            <Text style={{fontSize: 12,
        color: '#888',
        marginTop: 4,}}>{time}</Text>
          </View>
        </View>
    <View style={{ borderBottomWidth: 1, borderColor: '#fff' }} />
    </View>
    
  )
}

export default NotificationItem

