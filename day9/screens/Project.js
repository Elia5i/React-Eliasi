import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Projects = ({ image }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       width: '48%',
       borderRadius: 10,
       overflow: 'hidden',
       backgroundColor: '#fff',
       elevation: 3,
    },
    image: {
        width: '100%',
        height: 120,
    },
});

export default Projects;