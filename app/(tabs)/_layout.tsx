import useColor from '@/src/hooks/useColor';
import { AntDesign, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Href, Tabs } from 'expo-router';
import { ReactNode } from 'react';
import { Image, View, Platform, StatusBar } from 'react-native';

const TabLayout = () => {
  const { brandPrimary, brandPrimaryTap } = useColor();
  const iconSize = 27;
  const addIconSize = 35;

  const tabs: { name: string; icon: ReactNode, focusIcon: ReactNode, href?: Href | null }[] = [
    {
      name: "home",
      icon: <Ionicons size={iconSize} name={"home-outline"} />,
      focusIcon: <Ionicons size={iconSize} name={"home"} />,
      href: "/home",
    },
    {
      name: "search",
      icon: <AntDesign size={iconSize} name={"search1"} />,
      focusIcon: <FontAwesome5 size={iconSize} name={"search"} />,
      href: "/search",
    },
    {
      name: "add",
      icon: <AntDesign size={addIconSize} name={"pluscircle"} />,
      focusIcon: <AntDesign size={addIconSize} name={"pluscircle"} />,
      href: "/add",
    },
    {
      name: "notification",
      icon: <FontAwesome size={iconSize} name={"bell-o"} />,
      focusIcon: <FontAwesome size={iconSize} name={"bell"} />,
      href: "/notification",
    },
    {
      name: "profile",
      icon: <FontAwesome size={iconSize} name={"user-circle-o"} />,
      focusIcon: <FontAwesome size={iconSize} name={"user-circle"} />,
      href: "/profile",
    },
    {
      name: "user/[id]",
      icon: null,
      focusIcon: null,
      href: null,
    }
  ]

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
              tabBarIcon: ({ focused }) => (tab?.href && focused ? tab?.focusIcon : tab?.icon),
              tabBarShowLabel: false,
              tabBarInactiveTintColor: brandPrimaryTap,
              tabBarStyle: { height: Platform.OS === 'ios' ? 80 : 55 },
              href: tab?.href
            }}
          />
        ))}
      </Tabs>
    </>
  );
}

export default TabLayout