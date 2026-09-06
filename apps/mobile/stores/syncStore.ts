import { create } from 'zustand';

export const useSyncStore = create((set) => ({
  lastSynced: null,
  pendingCount: 0,
  isSyncing: false,
  syncError: null,
  setSyncing: (isSyncing) => set({ isSyncing }),
  setSyncResult: (lastSynced, pendingCount) => set({ lastSynced, pendingCount, isSyncing: false, syncError: null }),
  setSyncError: (syncError) => set({ syncError, isSyncing: false })
}));
