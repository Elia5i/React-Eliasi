import React, { useState } from "react";
import {View, Text, TextInput,Button, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const Login=()=>{
    const navigation=useNavigation();
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")

    const handleLogin=async()=>{
        try{
            const pergjigjja=await fetch("https://dymmyjson.com/auth/login", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/jason',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: 'omit'
            })
        }catch{

        }
    }
    return(
        <View>
  <Text>Fake Login</Text>
  
  <TextInput
    placeholder="Username"
    autoCapitalize="none"
    value={username}
    onChangeText={(shkrimi) => setUsername(shkrimi)}
  />

  <TextInput
    placeholder="Password"
    autoCapitalize="none"
    value={password}
    secureTextEntry
    onChangeText={(shkrimi) => setPassword(shkrimi)}
  />

  <Button title="Login" onPress={handleLogin} />
</View>



    )
}

export default Login