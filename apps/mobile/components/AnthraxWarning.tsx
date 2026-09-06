import { View, Text, StyleSheet, Button } from 'react-native';

export default function AnthraxWarning({ onDismiss }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚠️ SUSPECTED ANTHRAX</Text>
      <Text style={styles.alert}>DO NOT OPEN THE CARCASS</Text>
      <Text style={styles.alert}>DO NOT PERFORM NECROPSY</Text>
      <Button title="Call District Biosafety Officer" onPress={() => {}} color="white" />
      <View style={{ marginTop: 20 }}>
        <Button title="I Understand" onPress={onDismiss} color="#cc0000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 20 },
  alert: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }
});
