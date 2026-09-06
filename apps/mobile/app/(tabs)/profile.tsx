import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { useLiteStore } from '../../services/liteStore';

export default function Profile() {
  const { isLiteMode, toggleLiteMode, dataSaver, toggleDataSaver, lowBandwidthSync, toggleLowBandwidthSync, offlineQueueCount, setOfflineQueueCount } = useLiteStore();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setOfflineQueueCount(0);
      Alert.alert('Sync Completed 🔄', 'All pending health records and livestock reports synced successfully with central server.');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RP</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Rajesh Patel</Text>
          <Text style={styles.userRole}>Farmer / Livestock Owner</Text>
          <Text style={styles.userLoc}>📍 Village Rampur, District Anand</Text>
        </View>
      </View>

      {/* Sync & Queue Section */}
      <Text style={styles.sectionTitle}>Data & Sync Status</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Offline Queue</Text>
            <Text style={styles.rowSub}>{offlineQueueCount} reports waiting to sync</Text>
          </View>
          <TouchableOpacity
            style={[styles.syncBtn, isSyncing && styles.syncBtnDisabled]}
            disabled={isSyncing}
            onPress={handleManualSync}
          >
            <Text style={styles.syncBtnText}>{isSyncing ? 'Syncing...' : 'Sync Now'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lite Mode & Optimization Settings */}
      <Text style={styles.sectionTitle}>App Optimization (Lite Version)</Text>
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View style={styles.switchLabelBox}>
            <Text style={styles.rowTitle}>Lite App Mode</Text>
            <Text style={styles.rowSub}>Optimized for low RAM & older processors</Text>
          </View>
          <Switch
            value={isLiteMode}
            onValueChange={toggleLiteMode}
            trackColor={{ false: '#767577', true: '#2e7d32' }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.switchLabelBox}>
            <Text style={styles.rowTitle}>Data Saver Mode</Text>
            <Text style={styles.rowSub}>Compress data transfers over cellular network</Text>
          </View>
          <Switch
            value={dataSaver}
            onValueChange={toggleDataSaver}
            trackColor={{ false: '#767577', true: '#2e7d32' }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.switchLabelBox}>
            <Text style={styles.rowTitle}>Background Sync in 2G/3G</Text>
            <Text style={styles.rowSub}>Low-overhead background sync</Text>
          </View>
          <Switch
            value={lowBandwidthSync}
            onValueChange={toggleLowBandwidthSync}
            trackColor={{ false: '#767577', true: '#2e7d32' }}
          />
        </View>
      </View>

      {/* Multilingual Support */}
      <Text style={styles.sectionTitle}>Language / भाषा</Text>
      <View style={styles.card}>
        <View style={styles.langRow}>
          {[
            { id: 'en', name: 'English' },
            { id: 'hi', name: 'हिंदी (Hindi)' },
            { id: 'te', name: 'తెలుగు (Telugu)' },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[styles.langChip, selectedLanguage === lang.id && styles.langChipActive]}
              onPress={() => setSelectedLanguage(lang.id as any)}
            >
              <Text style={[styles.langText, selectedLanguage === lang.id && styles.langTextActive]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.versionText}>PashuRaX Lite v1.0.0 • Offline First Architecture</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  userCard: { flexDirection: 'row', backgroundColor: '#1b5e20', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#81c784', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#1b5e20' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  userRole: { fontSize: 12, color: '#a5d6a7', marginTop: 1 },
  userLoc: { fontSize: 11, color: '#e8f5e9', marginTop: 3 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#212121', marginBottom: 8, marginTop: 6 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#e0e0e0' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  switchLabelBox: { flex: 1, paddingRight: 10 },
  rowTitle: { fontSize: 14, fontWeight: 'bold', color: '#212121' },
  rowSub: { fontSize: 11, color: '#757575', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#eeeeee', marginVertical: 10 },
  syncBtn: { backgroundColor: '#2e7d32', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  syncBtnDisabled: { backgroundColor: '#a5d6a7' },
  syncBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  langChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  langChipActive: { backgroundColor: '#2e7d32' },
  langText: { fontSize: 12, color: '#424242', fontWeight: '500' },
  langTextActive: { color: '#ffffff', fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#9e9e9e', fontSize: 11, marginTop: 10, marginBottom: 20 },
});
