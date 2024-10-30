import { ApiPath } from '@/src/api/ApiPath';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';
import { Badge } from '@ant-design/react-native';
import { AntDesign, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { use } from 'i18next';
import { ReactNode, useEffect, useState } from 'react';
import { Image, View, Platform, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

const TabLayout = () => {
  const { brandPrimary, brandPrimaryTap } = useColor();
  const iconSize = 27;
  const addIconSize = 35;
  const { user, localStrings } = useAuth();
  const [dotStatus, setDotStatus] = useState(false);
  const mapNotifiCationContent = (type: string) => {
    switch (type) {
        case 'like_post':
            return 'đã thích bài viết của bạn: '
        case 'new_share':
            return 'đã chia sẻ bài viết của bạn: '
        case 'new_comment':
            return 'đã bình luận về bài viết của bạn: '
        case 'friend_request':
            return 'đã gưi lời mời kết bạn.'
        case 'accept_friend_request':
            return 'đã chấp nhận lời mời kết bạn.'
        default:
            return 'notifications'
    }
}
const connectWebSocket = async () => {
  const ws = new WebSocket (`${ApiPath.GETWS_APIPATH}${user?.id}`);

  ws.onopen = () => {
      console.log('Web Socket connected');
  };

  ws.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      const userName = notification?.from;
      const content = notification?.content;
      const type = notification?.notification_type;
      const status = notification?.status;

      console.log('Message:', notification);

      // Set the dot status directly
      setDotStatus(status);
      console.log('Dot status set to', status); // Log the updated status

      const mapType = mapNotifiCationContent(type);
      Toast.show({
          type: 'info',
          text1: `${userName} ${mapType}`,
          text2: `${content}`,
      });
  };

  ws.onclose = () => {
      console.log('WebSocket disconnected');
  };

  ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
  };

  return () => {
      ws.close();
  }
};


  const tabs: { name: string; icon: ReactNode, focusIcon: ReactNode }[] = [
    {
      name: "home",
      icon: <Ionicons size={iconSize} name={"home-outline"} />,
      focusIcon: <Ionicons size={iconSize} name={"home"} />,
    },
    {
      name: "search",
      icon: <AntDesign size={iconSize} name={"search1"} />,
      focusIcon: <FontAwesome5 size={iconSize} name={"search"} />,
    },
    {
      name: "add",
      icon: <AntDesign size={addIconSize} name={"pluscircle"} />,
      focusIcon: <AntDesign size={addIconSize} name={"pluscircle"} />,
    },
    {
      name: "notification",
      icon: (
        <Badge dot={dotStatus}>
            <FontAwesome size={iconSize} name={"bell-o"} />
        </Badge>
      ),
      focusIcon: <FontAwesome size={iconSize} name={"bell"} />,
    },
    {
      name: "profile",
      icon: <FontAwesome size={iconSize} name={"user-circle-o"} />,
      focusIcon: <FontAwesome size={iconSize} name={"user-circle"} />,
    },
  ]
  useEffect(() => {
    connectWebSocket();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tabs screenOptions={{
        tabBarActiveTintColor: brandPrimary,
        headerShown: false,
        headerStyle: {
          height: 80
        },
        headerTitle: "",
        headerLeft: () => (
          <View>
            <Image
              source={require('@/assets/images/yourvibes_black.png')}
              style={{
                width: 120,
                objectFit: 'contain',
                marginLeft: 10,
              }}
            />
          </View>
        )
      }}>
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab?.name}
            name={tab?.name}
            options={{
              tabBarIcon: ({ focused }) => (focused ? tab?.focusIcon : tab?.icon),
              tabBarShowLabel: false,
              tabBarInactiveTintColor: brandPrimaryTap,
              tabBarStyle: { height: Platform.OS === 'ios' ? 80 : 55 },
            }}
          />
        ))}
      </Tabs>
      <Toast />
      
    </>
  );
}

export default TabLayout