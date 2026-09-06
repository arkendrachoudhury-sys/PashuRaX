import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function AnimalCard({ animal, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{animal.tagNumber} - {animal.species}</Text>
      <Text>Breed: {animal.breed}</Text>
      <Text>Status: {animal.status}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 8, backgroundColor: 'white', borderRadius: 8, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold' }
});
