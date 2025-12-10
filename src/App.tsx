import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { DocumentList } from './views/DocumentList';
import { AIChatPanel } from './components/AIChatPanel';
import { useAppStore } from './store/useAppStore';

function App() {
  const { currentView } = useAppStore();

  const renderContent = () => {
    switch (currentView) {
      case 'documents':
        return <DocumentList />;
      case 'chat_history':
        return <div>Chat History View (Placeholder)</div>;
      default:
        // Default fall back to DocumentList or show placeholder
        return <DocumentList />;
    }
  };

  return (
    <MainLayout RightPanel={<AIChatPanel />}>
       {renderContent()}
    </MainLayout>
  );
}

export default App;
