import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Comments = () => {
    const [comments, setComments] = useState([]);

    const callAPI = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const data = await response.json();
        setComments(data);
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text style={styles.body}>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#2c3e50',
    },
    email: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#2980b9',
        marginBottom: 6,
    },
    body: {
        fontSize: 14,
        color: '#333',
    },
});

export default Comments;
