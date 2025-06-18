import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PortfolioScreen from './PortfolioScreen';
import TradeHistoryScreen from './TradeHistoryScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoutScreen from './LogoutScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Zerofy - Market"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

         if (route.name === 'Zerofy - Market') {
  iconName = 'bar-chart-outline';
} else if (route.name === 'Zerofy - Portfolio') {
  iconName = 'wallet-outline';
} else if (route.name === 'Trade History') {
  iconName = 'time-outline';
} else if (route.name === 'Logout') {
  iconName = 'log-out-outline'; 
}

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#58a6ff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#0d1117' },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Zerofy - Market"
        component={HomeScreen}
        options={{ title: 'Zerofy - Market' }}
      />
      <Tab.Screen
        name="Zerofy - Portfolio"
        component={PortfolioScreen}
        options={{ title: 'Zerofy - Portfolio' }}
      />
     <Tab.Screen
  name="Trade History"
  component={TradeHistoryScreen}
  options={{ title: 'Zerofy - Trade History' }}
/>
<Tab.Screen
  name="Log Out"
  component={LogoutScreen}
  options={{ title: 'Zerofy - Logout' }}
/>

    </Tab.Navigator>
  );
}
