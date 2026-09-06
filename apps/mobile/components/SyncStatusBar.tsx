import { View, Text, StyleSheet, Button } from 'react-native';

export default function SyncStatusBar() {
  return (
    <View style={styles.bar}>
      <Text style={styles.text}>Last Synced: 10 mins ago</Text>
      <Button title="Sync" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', alignItems: 'center' },
  text: { fontSize: 14 }
});
