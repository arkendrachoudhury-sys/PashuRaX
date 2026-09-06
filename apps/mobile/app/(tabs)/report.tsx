import React from 'react';
import { View, StyleSheet } from 'react-native';
import SymptomWizard from '../../components/SymptomWizard';

export default function Report() {
  return (
    <View style={styles.container}>
      <SymptomWizard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 12 },
});
