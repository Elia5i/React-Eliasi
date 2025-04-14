// App.js
import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDos from './ToDos';
import Comments from './Comments';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDos">
        <Stack.Screen
          name="ToDos"
          component={ToDos}
          options={({ navigation }) => ({
            title: 'To-Do List',
            headerRight: () => (
              <Button title="Comments" onPress={() => navigation.navigate('Comments')} />
            ),
          })}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={({ navigation }) => ({
            title: 'Comments',
            headerRight: () => (
              <Button title="ToDos" onPress={() => navigation.navigate('ToDos')} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
