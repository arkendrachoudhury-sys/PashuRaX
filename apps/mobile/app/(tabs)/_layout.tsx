import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import OfflineBanner from '../../components/OfflineBanner';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <OfflineBanner />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1b5e20',
          tabBarInactiveTintColor: '#757575',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          headerStyle: {
            backgroundColor: '#1b5e20',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerTitle: 'PashuRaX Lite',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="animals"
          options={{
            title: 'Animals',
            headerTitle: 'Livestock Registry',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🐄</Text>,
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: 'Report',
            headerTitle: 'Disease Reporting',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🚨</Text>,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alerts',
            headerTitle: 'Outbreak Alerts',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔔</Text>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerTitle: 'Settings & Sync',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
