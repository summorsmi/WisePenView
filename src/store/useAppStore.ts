import { create } from 'zustand';

interface AppState {
  isAIChatOpen: boolean;
  toggleAIChat: () => void;
  currentView: 'documents' | 'chat_history' | 'settings'; // simple view switching
  setCurrentView: (view: 'documents' | 'chat_history' | 'settings') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAIChatOpen: true, // Default open as per screenshot
  toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
  currentView: 'documents',
  setCurrentView: (view) => set({ currentView: view }),
}));
