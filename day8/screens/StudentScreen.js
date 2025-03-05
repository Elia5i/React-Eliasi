import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StudentDetails from '../components/StudentDetails';

const StudentScreen = () => {

    const students = [
        {
            id: 1,
            name:'Elias',
            description: 'Loves coding and exploring',
            image: require('../assets/student1.jpeg'),
        },
        {
            id: 2,
            name:'Milot',
            description: 'Loves coding and exploring',
            image: require('../assets/student2.jpeg'),
        },
        {
            id: 3,
            name:'Rion',
            description: 'Loves coding and exploring',
            image: require('../assets/student3.jpeg'),
        }
    ];
    return(
        <ScrollView contentContainerStyle={styles.container}>

            {students.map(student =>(
                <StudentDetails
                    key={student.id}
                    name={student.name}
                    description={student.description}
                    image={student.image}
                />
            ))}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f0f0f0', 
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', 
    }
});

export default StudentScreen; 