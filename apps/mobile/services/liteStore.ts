import { create } from 'zustand';

interface LiteState {
  isLiteMode: boolean;
  dataSaver: boolean;
  lowBandwidthSync: boolean;
  offlineQueueCount: number;
  toggleLiteMode: () => void;
  toggleDataSaver: () => void;
  toggleLowBandwidthSync: () => void;
  setOfflineQueueCount: (count: number) => void;
}

export const useLiteStore = create<LiteState>((set) => ({
  isLiteMode: true,
  dataSaver: true,
  lowBandwidthSync: true,
  offlineQueueCount: 0,
  toggleLiteMode: () => set((state) => ({ isLiteMode: !state.isLiteMode })),
  toggleDataSaver: () => set((state) => ({ dataSaver: !state.dataSaver })),
  toggleLowBandwidthSync: () => set((state) => ({ lowBandwidthSync: !state.lowBandwidthSync })),
  setOfflineQueueCount: (count: number) => set({ offlineQueueCount: count }),
}));
