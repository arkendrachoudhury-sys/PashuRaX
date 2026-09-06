import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLiteStore } from '../services/liteStore';

export default function OfflineBanner() {
  const { offlineQueueCount } = useLiteStore();

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        📶 Offline-First Mode Active {offlineQueueCount > 0 ? `• (${offlineQueueCount} queued for sync)` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fff3cd', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ffeba1' },
  text: { color: '#856404', fontSize: 11, fontWeight: 'bold' }
});
