import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useLiteStore } from '../services/liteStore';

const SYMPTOMS_LIST = [
  { id: 'fever', label: 'High Fever / Temperature', icon: '🌡️' },
  { id: 'lesions', label: 'Mouth / Foot Lesions or Blisters', icon: '👄' },
  { id: 'salivation', label: 'Excessive Salivation / Drooling', icon: '🤤' },
  { id: 'lameness', label: 'Lameness / Difficulty Walking', icon: '🦵' },
  { id: 'nodules', label: 'Skin Nodules / Lumps', icon: '🟡' },
  { id: 'coughing', label: 'Coughing / Nasal Discharge', icon: '🫁' },
  { id: 'appetite', label: 'Loss of Appetite / Lethargy', icon: '🥣' },
  { id: 'milk_drop', label: 'Sudden Drop in Milk Production', icon: '🥛' },
  { id: 'mortality', label: 'Sudden Death / Mortality', icon: '⚠️' },
];

export default function SymptomWizard() {
  const [step, setStep] = useState(1);
  const [selectedTag, setSelectedTag] = useState('TAG-1082');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [temperature, setTemperature] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Moderate');
  const [notes, setNotes] = useState('');
  const { offlineQueueCount, setOfflineQueueCount } = useLiteStore();

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleSubmit = () => {
    setOfflineQueueCount(offlineQueueCount + 1);
    Alert.alert(
      'Report Saved Offline! 📶',
      'The disease incident report has been stored on your device and queued for sync when network is available.',
      [{ text: 'OK', onPress: () => {
        setStep(1);
        setSelectedSymptoms([]);
        setTemperature('');
        setNotes('');
      }}]
    );
  };

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressRow}>
        {[1, 2, 3].map((s) => (
          <View
            key={s}
            style={[
              styles.progressStep,
              step >= s && styles.progressStepActive,
            ]}
          >
            <Text style={[styles.progressText, step >= s && styles.progressTextActive]}>
              Step {s}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Step 1: Select Affected Livestock</Text>
            <Text style={styles.stepSubtitle}>Choose ear tag or animal ID</Text>

            <View style={styles.tagOptions}>
              {['TAG-1082 (Cattle)', 'TAG-1083 (Buffalo)', 'TAG-1084 (Goat)', 'Herd / Multiple Animals'].map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tagCard, selectedTag === tag && styles.tagCardActive]}
                  onPress={() => setSelectedTag(tag)}
                >
                  <Text style={[styles.tagCardText, selectedTag === tag && styles.tagCardTextActive]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
              <Text style={styles.nextBtnText}>Next: Select Symptoms ➔</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Step 2: Observe Symptoms</Text>
            <Text style={styles.stepSubtitle}>Tap all symptoms visible on the animal</Text>

            <View style={styles.symptomsGrid}>
              {SYMPTOMS_LIST.map((item) => {
                const isSelected = selectedSymptoms.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.symptomTile, isSelected && styles.symptomTileActive]}
                    onPress={() => toggleSymptom(item.id)}
                  >
                    <Text style={styles.symptomIcon}>{item.icon}</Text>
                    <Text style={[styles.symptomLabel, isSelected && styles.symptomLabelActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.navRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
                <Text style={styles.backBtnText}>⬅ Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextBtn, selectedSymptoms.length === 0 && styles.btnDisabled]}
                disabled={selectedSymptoms.length === 0}
                onPress={() => setStep(3)}
              >
                <Text style={styles.nextBtnText}>Next: Vital Signs ➔</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Step 3: Severity & Temperature</Text>
            <Text style={styles.stepSubtitle}>Enter details to assist veterinary diagnosis</Text>

            <Text style={styles.fieldLabel}>Body Temperature (°F) - Optional</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 104.5"
              keyboardType="numeric"
              value={temperature}
              onChangeText={setTemperature}
            />

            <Text style={styles.fieldLabel}>Perceived Illness Severity</Text>
            <View style={styles.severityRow}>
              {(['Low', 'Moderate', 'High', 'Critical'] as const).map((sev) => (
                <TouchableOpacity
                  key={sev}
                  style={[styles.sevBtn, severity === sev && styles.sevBtnActive]}
                  onPress={() => setSeverity(sev)}
                >
                  <Text style={[styles.sevText, severity === sev && styles.sevTextActive]}>{sev}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Additional Observations / Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe onset, duration, or herd impact..."
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />

            <View style={styles.navRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(2)}>
                <Text style={styles.backBtnText}>⬅ Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>💾 Submit Report (Offline)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 16 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  progressStep: { flex: 1, paddingVertical: 8, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#e0e0e0' },
  progressStepActive: { borderBottomColor: '#2e7d32' },
  progressText: { fontSize: 12, color: '#9e9e9e', fontWeight: 'bold' },
  progressTextActive: { color: '#2e7d32' },
  scrollContent: { paddingBottom: 20 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#1b5e20' },
  stepSubtitle: { fontSize: 13, color: '#616161', marginBottom: 16 },
  tagOptions: { gap: 10, marginBottom: 20 },
  tagCard: { padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fafafa' },
  tagCardActive: { borderColor: '#2e7d32', backgroundColor: '#e8f5e9' },
  tagCardText: { fontSize: 14, color: '#333', fontWeight: '500' },
  tagCardTextActive: { color: '#1b5e20', fontWeight: 'bold' },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  symptomTile: { width: '48%', backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', alignItems: 'center' },
  symptomTileActive: { backgroundColor: '#e8f5e9', borderColor: '#2e7d32' },
  symptomIcon: { fontSize: 24, marginBottom: 4 },
  symptomLabel: { fontSize: 11, color: '#424242', textAlign: 'center' },
  symptomLabelActive: { color: '#1b5e20', fontWeight: 'bold' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  backBtn: { padding: 12, borderRadius: 8, backgroundColor: '#eeeeee' },
  backBtnText: { color: '#424242', fontWeight: 'bold' },
  nextBtn: { flex: 1, marginLeft: 10, backgroundColor: '#2e7d32', padding: 12, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#ffffff', fontWeight: 'bold' },
  btnDisabled: { backgroundColor: '#a5d6a7' },
  fieldLabel: { fontSize: 13, fontWeight: 'bold', color: '#424242', marginTop: 12, marginBottom: 6 },
  textInput: { borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 8, padding: 10, fontSize: 14, color: '#212121' },
  textArea: { height: 80, textAlignVertical: 'top' },
  severityRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6, marginBottom: 10 },
  sevBtn: { flex: 1, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  sevBtnActive: { backgroundColor: '#c62828', borderColor: '#c62828' },
  sevText: { fontSize: 12, color: '#333' },
  sevTextActive: { color: '#fff', fontWeight: 'bold' },
  submitBtn: { flex: 1, marginLeft: 10, backgroundColor: '#1b5e20', padding: 12, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});
