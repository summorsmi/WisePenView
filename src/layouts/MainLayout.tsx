import React from 'react';
import { Layout, Button, Menu, theme, Avatar } from 'antd';
import { 
  PlusOutlined, 
  FileTextOutlined, 
  MessageOutlined, 
  UserOutlined
} from '@ant-design/icons';
import { useAppStore } from '../store/useAppStore';
import logoIcon from '../assets/images/logo-icon.png';
import './MainLayout.scss';

const { Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  RightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, RightPanel }) => {
  const { isAIChatOpen, currentView, setCurrentView } = useAppStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="main-layout" style={{ height: '100vh', flexDirection: 'row' }}>
      {/* Left Sidebar */}
      <Sider width={250} theme="light" className="left-sidebar">
        <div className="sidebar-header">
           <div className="logo-area">
              <img src={logoIcon} alt="Logo" style={{ height: 24, marginRight: 8 }} />
              <span className="brand-name">WisePen</span>
           </div>
        </div>
        
        <div className="sidebar-action">
             <Button type="primary" icon={<PlusOutlined />} block shape="round" size="large" style={{ marginBottom: 16 }}>
                新聊天
             </Button>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={[currentView]}
          style={{ borderRight: 0 }}
          onClick={({ key }) => setCurrentView(key as 'documents' | 'chat_history' | 'settings')}
          items={[
            {
              key: 'documents',
              icon: <FileTextOutlined />,
              label: '文档与云盘',
            },
            {
              key: 'chat_history',
              type: 'group',
              label: '聊天记录',
              children: [
                { key: 'chat1', label: '英语作文 1', icon: <MessageOutlined /> },
                { key: 'chat2', label: '英语作文 2', icon: <MessageOutlined /> },
              ]
            },
            {
                key: 'docs_list',
                type: 'group',
                label: '文档',
                children: [
                  { key: 'doc1', label: '未命名文档', icon: <FileTextOutlined /> },
                ]
            }
          ]}
        />
        
        <div className="user-profile-sticky">
             <Avatar icon={<UserOutlined />} />
             <span style={{ marginLeft: 8 }}>user_1008</span>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
        <Content
          style={{
            margin: 0,
            padding: 24,
            background: colorBgContainer,
            overflowY: 'auto',
            position: 'relative'
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* Right Sidebar - AI Chat */}
      <div 
        className={`right-sidebar ${isAIChatOpen ? 'open' : 'closed'}`}
        style={{ 
            width: isAIChatOpen ? 400 : 0, 
            transition: 'width 0.3s ease',
            borderLeft: '1px solid #f0f0f0',
            background: '#fff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}
      >
        {RightPanel}
      </div>
    </Layout>
  );
};
