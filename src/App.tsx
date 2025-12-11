import { MainLayout } from './layouts/MainLayout';
import { FileManager } from './views/FileManager';
import { useAppStore } from './store/useAppStore';

function App() {
  const { currentView } = useAppStore();

  const renderContent = () => {
    switch (currentView) {
      case 'documents':
        return <FileManager />;
      case 'chat_history':
        return <div>Chat History View (Placeholder)</div>;
      default:
        // Default fall back to FileManager
        return <FileManager />;
    }
  };

  return (
    <MainLayout>
       {renderContent()}
    </MainLayout>
  );
}

export default App;
