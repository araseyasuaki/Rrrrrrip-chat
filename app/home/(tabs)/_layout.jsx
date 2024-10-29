import { Image, Platform, useWindowDimensions } from 'react-native';
import { Tabs } from "expo-router";

export default function TabLayout() {
  // デバイスの幅を取得
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 1024; // Webかつ幅が1024px以上の場合はPCと判断

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          backgroundColor: "#252525",
          borderRadius: 20,
          position: "absolute",
          bottom: isDesktop ? 10 : 20, // PCの場合は40、それ以外は20
          width: "80%",
          marginHorizontal: '10%',
          alignSelf: "center",
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../../assets/images/tabProfileIconOn.png') : require('../../../assets/images/tabProfileIconOff.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../../assets/images/tabMatchingIconOn.png') : require('../../../assets/images/tabMatchingIconOff.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../../assets/images/tabChatIconOn.png') : require('../../../assets/images/tabChatIconOff.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../../assets/images/tabNewsIconOn.png') : require('../../../assets/images/tabNewsIconOff.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
