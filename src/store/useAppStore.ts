import { create } from 'zustand';

interface AppState {
  isAIChatOpen: boolean;
  toggleAIChat: () => void;
  setAIChatOpen: (open: boolean) => void;

  isSiderCollapsed: boolean;
  toggleSider: () => void;

  currentView: 'documents' | 'chat_history' | 'settings';
  setCurrentView: (view: 'documents' | 'chat_history' | 'settings') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAIChatOpen: false, // Default closed to match Vue logic initially, or open if preferred
  toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
  setAIChatOpen: (open) => set({ isAIChatOpen: open }),

  isSiderCollapsed: false,
  toggleSider: () => set((state) => ({ isSiderCollapsed: !state.isSiderCollapsed })),

  currentView: 'documents',
  setCurrentView: (view) => set({ currentView: view }),
}));
