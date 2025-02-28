import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';




const StudentInfoScreen = () => {
  let firstName = 'Elias';
  let surname = 'Sinani';
  const birthday = '30-04-2011';
  let school = '"SHFMU Dardania"'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Info</Text>
      <Text style={styles.info}>First Name: {firstName}</Text>
      <Text style={styles.info}>Surname: {surname}</Text>
      <Text style={styles.info}>Birthday: {birthday}</Text>
      <Text style={styles.info}>School: {school}</Text>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  }
});
export default App;