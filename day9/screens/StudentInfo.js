import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileScreen from './ProfileScreen';

const StudentInfo = ({ fullName, position, description, profileImage }) => {
    return (
        <View style={styles.container}>
            <Image
                                source={require('../assets/pfp.jpg')}
                                style = {styles.profileImage}
                            />
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.position}>{position}</Text>
            <Text style={styles.description}>{description}</Text>

            <TouchableOpacity style={styles.hireButton}>
                <Text style={styles.hireText}>HIRE HIM</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0f7fa',
        alignItems: 'center',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#444',
    },
    position: {
        fontSize: 16,
        color: '#666',
    },
    description: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#444',
    },
    hireButton: {
        backgroundColor: '#FFD70',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    hireText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default StudentInfo;