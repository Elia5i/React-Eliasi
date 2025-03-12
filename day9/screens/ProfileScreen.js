import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import StudentInfo from './StudentInfo';
import Projects from './Projects';

import profileImage from '../assets/pfp.jpg';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
                <StudentInfo
                    fullName="Rubik Dula"
                    position="UI/UX Designer"
                    description="Passionate about creating designs for startups and local brands"
                />

                <View style={styles.projectsSection}>
                    <View style={styles.projectsHeader}>
                        <Text style={styles.projectsTitle}>PROJECTS</Text>
                        <TouchableOpacity style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                <View style={styles.projectsContainer}>
                    <Image
                        source={require('../assets/project.png')}
                        style = {styles.Projects}
                    />
                    <Image
                        source={require('../assets/project2.jpeg')}
                        style = {styles.Projects2}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profileContainer: {
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
    projectsSection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 3,
    },
    projectsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAllButton: {
        backgroundColor: '#FFD70',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    viewAllText: {
        color: '#000',
        fontWeight: 'bold',
    },
    projectsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Projects2: {
        width: 1000,
        height: 500
    }
});

export default ProfileScreen;