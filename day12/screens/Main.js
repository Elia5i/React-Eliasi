import react,{useEffect, useState} from "react";
import {Views, Text, FlatList, View} from 'react-native';
const Main =()=>{
    const [posts, setPosts]=useState([])
    const APICALL = async async=>{
        await fetch("https://jsonplaceholder.typicode.com/posts").then((pergjigjja)=>pergjigjja.json()).then(setPosts(pergjigjja))
    }
    useEffect(()=>{
        APICALL()
    },[] )

    return (
        <FlatList
            data={posts}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>{
                return <View>
                    <Text>{item.title}</Text>
                    <Text>{item.body}</Text>
                </View>
            }}
        />
    )
}
export default Main