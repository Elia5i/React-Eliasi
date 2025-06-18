
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    const logout = async () => {
      try {
        await auth.signOut();
        navigation.replace('SignIn'); 
      } catch (e) {
        console.error('Logout error:', e);
      }
    };
    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#58a6ff" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0d1117' },
  text: { marginTop: 16, color: '#58a6ff', fontSize: 18 },
});
