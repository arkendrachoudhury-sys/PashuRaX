import { create } from 'zustand';

interface FilterState {
  dateRange: { start: string; end: string } | null;
  jurisdiction: string | null;
  species: string | null;
  severity: string | null;
  setFilters: (filters: Partial<FilterState>) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: null,
  jurisdiction: null,
  species: null,
  severity: null,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
