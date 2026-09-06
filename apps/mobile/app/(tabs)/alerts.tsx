import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface AlertItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  location: string;
  distance: string;
  date: string;
  summary: string;
  advisory: string;
}

const ALERTS_DATA: AlertItem[] = [
  {
    id: '1',
    title: 'Foot and Mouth Disease (FMD) Suspected',
    severity: 'Critical',
    location: 'Rampur Village, Block 2',
    distance: '3.2 km away',
    date: 'Today, 09:30 AM',
    summary: '3 cattle reported with high fever and oral lesions in neighboring village.',
    advisory: 'Isolate susceptible animals. Avoid grazing in common pastures near Rampur village stream.',
  },
  {
    id: '2',
    title: 'Lumpy Skin Disease (LSD) Warning',
    severity: 'High',
    location: 'Chandpur District Border',
    distance: '12 km away',
    date: 'Yesterday',
    summary: 'Cluster of skin nodule cases confirmed in adjacent district.',
    advisory: 'Apply vector control / fly repellents in animal sheds. Inspect animals for skin lumps daily.',
  },
  {
    id: '3',
    title: 'Vaccination Drive Announcement',
    severity: 'Low',
    location: 'Sub-District Vet Clinic',
    distance: '1.5 km away',
    date: '2 Oct 2026',
    summary: 'Free HS & BQ booster vaccination drive starting next Monday.',
    advisory: 'Ensure all eligible cattle above 4 months are brought to the vaccination center or queue field vet visit.',
  },
];

export default function Alerts() {
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const getSeverityStyle = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'Critical': return { bg: '#ffebee', border: '#ef5350', text: '#c62828' };
      case 'High': return { bg: '#fff3e0', border: '#ffb74d', text: '#e65100' };
      case 'Moderate': return { bg: '#fffde7', border: '#ffd54f', text: '#f57f17' };
      case 'Low': return { bg: '#e8f5e9', border: '#81c784', text: '#2e7d32' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disease Outbreaks & Advisories</Text>
        <Text style={styles.headerSubtitle}>Real-time location based warning system</Text>
      </View>

      <FlatList
        data={ALERTS_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const sev = getSeverityStyle(item.severity);
          const isExpanded = expandedId === item.id;

          return (
            <TouchableOpacity
              style={[styles.alertCard, { backgroundColor: sev.bg, borderColor: sev.border }]}
              activeOpacity={0.9}
              onPress={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <View style={styles.cardTop}>
                <View style={[styles.badge, { backgroundColor: sev.text }]}>
                  <Text style={styles.badgeText}>{item.severity.toUpperCase()}</Text>
                </View>
                <Text style={styles.distanceText}>📍 {item.distance}</Text>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.locationText}>🏠 {item.location} • {item.date}</Text>

              <Text style={styles.summary}>{item.summary}</Text>

              {isExpanded && (
                <View style={styles.advisoryBox}>
                  <Text style={styles.advisoryTitle}>🛡️ Recommended Action / Advisory:</Text>
                  <Text style={styles.advisoryText}>{item.advisory}</Text>
                </View>
              )}

              <Text style={styles.expandHint}>
                {isExpanded ? '▲ Tap to collapse' : '▼ Tap to view advisory & instructions'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1b5e20', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 12, color: '#a5d6a7', marginTop: 2 },
  listContent: { padding: 16 },
  alertCard: { borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
  distanceText: { fontSize: 11, fontWeight: 'bold', color: '#424242' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#212121', marginBottom: 4 },
  locationText: { fontSize: 12, color: '#616161', marginBottom: 8 },
  summary: { fontSize: 13, color: '#333333', lineHeight: 18, marginBottom: 8 },
  advisoryBox: { backgroundColor: 'rgba(255,255,255,0.7)', padding: 10, borderRadius: 6, marginTop: 4, marginBottom: 8 },
  advisoryTitle: { fontSize: 12, fontWeight: 'bold', color: '#1b5e20', marginBottom: 2 },
  advisoryText: { fontSize: 12, color: '#212121', lineHeight: 16 },
  expandHint: { fontSize: 11, color: '#616161', fontStyle: 'italic', textAlign: 'right' },
});
