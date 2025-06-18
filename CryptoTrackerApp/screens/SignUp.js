import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    console.log('Starting signup for:', email);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;
      console.log('User created:', user.uid);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        balance: 1000,
        portfolio: [],
        trades: [],
      });
      console.log('User doc saved in Firestore');

      setLoading(false);

      
      navigation.replace('MainTabs');

      
      setTimeout(() => {
        Alert.alert('Account created!', 'You can now log in.');
      }, 500); 

    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error.message || 'Unknown error occurred');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#58a6ff" />
      ) : (
        <Button title="Create Account" onPress={handleSignUp} color="#58a6ff" />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#58a6ff',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#161b22',
    color: 'white',
    fontSize: 18,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  link: {
    color: '#58a6ff',
    marginTop: 20,
    textAlign: 'center',
  },
});
