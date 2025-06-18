import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import CoinDetailScreen from './screens/CoinDetailScreen';
import MainTabs from './screens/MainTabs';
import { PortfolioProvider } from './context/PortfolioContext';
import SignUpScreen from './screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PortfolioProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CoinDetail"
            component={CoinDetailScreen}
            options={{
              title: 'Details',
              headerStyle: {
                backgroundColor: '#0d1117',
              },
              headerTintColor: '#58a6ff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PortfolioProvider>
  );
}
