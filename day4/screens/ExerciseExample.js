import React from 'react'
import {View, Text, FlatList} from 'react-native'

const ExerciseExample =()=>{
    return (
        <View>
            <Text>Hello from this screen</Text>
        
            <FlatList
                data={StudentList}
                renderItem={({item})=>{
                    return <Text>{item.name} {item.surname} - {item.age} </Text>
                }}
            />
        </View>
    )
}

export default ExerciseExample;