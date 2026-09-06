import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useLiteStore } from '../../services/liteStore';

export default function Home() {
  const router = useRouter();
  const { isLiteMode, toggleLiteMode, offlineQueueCount } = useLiteStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PashuRaX Lite</Text>
          <Text style={styles.subtitle}>Livestock Surveillance & Early Warning</Text>
        </View>
        <View style={styles.liteToggleContainer}>
          <Text style={styles.liteToggleText}>{isLiteMode ? '⚡ Lite' : ' Full'}</Text>
          <Switch
            value={isLiteMode}
            onValueChange={toggleLiteMode}
            trackColor={{ false: '#767577', true: '#2e7d32' }}
            thumbColor={isLiteMode ? '#81c784' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Sync / Connectivity Status */}
      <View style={styles.statusBanner}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>
          Offline First Mode • {offlineQueueCount} Pending Reports
        </Text>
      </View>

      {/* Key Metrics / Overview */}
      <Text style={styles.sectionTitle}>Quick Overview</Text>
      <View style={styles.kpiRow}>
        <View style={[styles.kpiCard, styles.kpiGreen]}>
          <Text style={styles.kpiNumber}>24</Text>
          <Text style={styles.kpiLabel}>My Animals</Text>
        </View>
        <View style={[styles.kpiCard, styles.kpiOrange]}>
          <Text style={styles.kpiNumber}>3</Text>
          <Text style={styles.kpiLabel}>Sick / Under Treatment</Text>
        </View>
        <View style={[styles.kpiCard, styles.kpiRed]}>
          <Text style={styles.kpiNumber}>1</Text>
          <Text style={styles.kpiLabel}>Active Outbreak Alert</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <Text style={styles.sectionTitle}>Fast Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryAction]}
          activeOpacity={0.8}
          onPress={() => router.push('/report')}
        >
          <Text style={styles.primaryActionText}>🚨 Report Symptom / Illness</Text>
          <Text style={styles.actionSubtext}>Fast 3-step reporting wizard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => router.push('/animals')}
        >
          <Text style={styles.actionText}>🐄 Manage Animals & Herds</Text>
          <Text style={styles.actionSubtext}>View records & register livestock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => router.push('/alerts')}
        >
          <Text style={styles.actionText}>🔔 Outbreak Alerts & Guidance</Text>
          <Text style={styles.actionSubtext}>View village & district advisories</Text>
        </TouchableOpacity>
      </View>

      {/* Low-resource tip */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Low-Bandwidth Mode Active</Text>
        <Text style={styles.tipText}>
          Data usages are minimized. All health reports and logs save instantly offline and sync automatically when internet is detected.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b5e20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 12, color: '#a5d6a7', marginTop: 2 },
  liteToggleContainer: { alignItems: 'center' },
  liteToggleText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
    marginBottom: 16,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2e7d32', marginRight: 8 },
  statusText: { fontSize: 13, color: '#1b5e20', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#212121', marginBottom: 10, marginTop: 6 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  kpiCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  kpiGreen: { backgroundColor: '#e8f5e9' },
  kpiOrange: { backgroundColor: '#fff3e0' },
  kpiRed: { backgroundColor: '#ffebee' },
  kpiNumber: { fontSize: 20, fontWeight: 'bold', color: '#212121' },
  kpiLabel: { fontSize: 11, color: '#616161', textAlign: 'center', marginTop: 2 },
  actionsGrid: { marginBottom: 16 },
  actionButton: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  primaryAction: {
    backgroundColor: '#2e7d32',
    borderColor: '#1b5e20',
  },
  actionText: { fontSize: 15, fontWeight: 'bold', color: '#212121' },
  primaryActionText: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
  actionSubtext: { fontSize: 12, color: '#757575', marginTop: 2 },
  tipCard: { backgroundColor: '#e3f2fd', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#bbdefb' },
  tipTitle: { fontSize: 13, fontWeight: 'bold', color: '#0d47a1', marginBottom: 2 },
  tipText: { fontSize: 12, color: '#1565c0', lineHeight: 16 },
});
