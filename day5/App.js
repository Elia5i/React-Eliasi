import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StudentInfoScreen  from './screens/StudentInfoScreen';

export default function App() {
  return (
    <StudentInfoScreen></StudentInfoScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
