import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';

interface Animal {
  id: string;
  tagNumber: string;
  species: string;
  breed: string;
  sex: string;
  status: 'Healthy' | 'Sick' | 'Under Treatment' | 'Quarantined';
  lastChecked: string;
}

const INITIAL_ANIMALS: Animal[] = [
  { id: '1', tagNumber: 'TAG-1082', species: 'Cattle', breed: 'Gir', sex: 'Female', status: 'Healthy', lastChecked: 'Today' },
  { id: '2', tagNumber: 'TAG-1083', species: 'Buffalo', breed: 'Murrah', sex: 'Female', status: 'Sick', lastChecked: 'Yesterday' },
  { id: '3', tagNumber: 'TAG-1084', species: 'Goat', breed: 'Jamnapari', sex: 'Male', status: 'Healthy', lastChecked: '3 days ago' },
  { id: '4', tagNumber: 'TAG-1085', species: 'Cattle', breed: 'Sahiwal', sex: 'Female', status: 'Under Treatment', lastChecked: 'Today' },
  { id: '5', tagNumber: 'TAG-1086', species: 'Sheep', breed: 'Marwari', sex: 'Male', status: 'Quarantined', lastChecked: '5 days ago' },
];

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS);
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');
  const [modalVisible, setModalVisible] = useState(false);

  // New Animal form state
  const [newTag, setNewTag] = useState('');
  const [newSpecies, setNewSpecies] = useState('Cattle');
  const [newBreed, setNewBreed] = useState('');
  const [newSex, setNewSex] = useState('Female');

  const speciesList = ['All', 'Cattle', 'Buffalo', 'Goat', 'Sheep', 'Pig'];

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.tagNumber.toLowerCase().includes(search.toLowerCase()) ||
                          animal.breed.toLowerCase().includes(search.toLowerCase());
    const matchesSpecies = selectedSpecies === 'All' || animal.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  const handleAddAnimal = () => {
    if (!newTag.trim()) return;
    const newEntry: Animal = {
      id: Date.now().toString(),
      tagNumber: newTag.startsWith('TAG-') ? newTag : `TAG-${newTag}`,
      species: newSpecies,
      breed: newBreed || 'Local',
      sex: newSex,
      status: 'Healthy',
      lastChecked: 'Just now',
    };
    setAnimals([newEntry, ...animals]);
    setNewTag('');
    setNewBreed('');
    setModalVisible(false);
  };

  const getStatusColor = (status: Animal['status']) => {
    switch (status) {
      case 'Healthy': return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Sick': return { bg: '#ffebee', text: '#c62828' };
      case 'Under Treatment': return { bg: '#fff3e0', text: '#e65100' };
      case 'Quarantined': return { bg: '#f3e5f5', text: '#6a1b9a' };
      default: return { bg: '#f5f5f5', text: '#616161' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Search & Filter Header */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search tag number or breed..."
          placeholderTextColor="#9e9e9e"
          value={search}
          onChangeText={setSearch}
        />

        {/* Horizontal Species Filter */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={speciesList}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedSpecies === item && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecies(item)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpecies === item && styles.filterChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Animal Count & Add Button Header */}
      <View style={styles.listHeader}>
        <Text style={styles.countText}>{filteredAnimals.length} Livestock Found</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Register Animal</Text>
        </TouchableOpacity>
      </View>

      {/* Animal List */}
      <FlatList
        data={filteredAnimals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const statusStyle = getStatusColor(item.status);
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagNumber}>{item.tagNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.detailText}>🐾 <Text style={styles.detailBold}>{item.species}</Text> ({item.breed})</Text>
                <Text style={styles.detailText}>🚻 {item.sex}</Text>
                <Text style={styles.detailText}>🕒 Checked: {item.lastChecked}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* Register Animal Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Register New Animal</Text>

            <Text style={styles.inputLabel}>Tag Number / Ear Tag ID</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 1087"
              value={newTag}
              onChangeText={setNewTag}
            />

            <Text style={styles.inputLabel}>Species</Text>
            <View style={styles.radioRow}>
              {['Cattle', 'Buffalo', 'Goat', 'Sheep'].map((sp) => (
                <TouchableOpacity
                  key={sp}
                  style={[styles.radioBtn, newSpecies === sp && styles.radioBtnActive]}
                  onPress={() => setNewSpecies(sp)}
                >
                  <Text style={[styles.radioText, newSpecies === sp && styles.radioTextActive]}>{sp}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Breed (Optional)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Sahiwal / Local"
              value={newBreed}
              onChangeText={setNewBreed}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddAnimal}>
                <Text style={styles.saveBtnText}>Save Animal (Offline)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  searchSection: { backgroundColor: '#ffffff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  searchInput: { backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: '#212121', marginBottom: 10 },
  filterList: { paddingVertical: 2 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f0f0f0', marginRight: 8 },
  filterChipActive: { backgroundColor: '#2e7d32' },
  filterChipText: { fontSize: 12, color: '#616161', fontWeight: '600' },
  filterChipTextActive: { color: '#ffffff' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  countText: { fontSize: 13, color: '#616161', fontWeight: '600' },
  addButton: { backgroundColor: '#1b5e20', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  addButtonText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  listContent: { padding: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tagNumber: { fontSize: 16, fontWeight: 'bold', color: '#1b5e20' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  cardDetails: { gap: 2 },
  detailText: { fontSize: 12, color: '#424242' },
  detailBold: { fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContainer: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1b5e20', marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#424242', marginTop: 10, marginBottom: 4 },
  modalInput: { borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 6, padding: 10, fontSize: 14, color: '#212121' },
  radioRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  radioBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
  radioBtnActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  radioText: { fontSize: 12, color: '#333' },
  radioTextActive: { color: '#fff', fontWeight: 'bold' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 10 },
  cancelBtn: { padding: 10 },
  cancelBtnText: { color: '#757575', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#2e7d32', padding: 10, borderRadius: 6 },
  saveBtnText: { color: '#ffffff', fontWeight: 'bold' },
});
