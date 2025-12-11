import React from 'react';
import { Layout, Button, theme } from 'antd';
import { GlobalSider } from '../components/GlobalSider';
import { AiSider } from '../components/AiSider';
import { useAppStore } from '../store/useAppStore';
import './MainLayout.less';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAIChatOpen, setAIChatOpen } = useAppStore();
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <GlobalSider />

      <Layout className="center-layout">
        <Content className="center-content">
          {!isAIChatOpen && (
            <Button
              type="text"
              className="ai-trigger-btn"
              onClick={() => setAIChatOpen(true)}
            >
              AI 助手
            </Button>
          )}
          {children}
        </Content>
      </Layout>

      <AiSider />
    </Layout>
  );
};
