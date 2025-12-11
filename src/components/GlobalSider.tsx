import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button, theme } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
  PlusCircleFilled,
  FileTextOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../store/useAppStore';
import logoIcon from '../assets/images/logo-icon.png';
import './GlobalSider.less';

const { Sider } = Layout;

export const GlobalSider: React.FC = () => {
  const { isSiderCollapsed, toggleSider, currentView, setCurrentView } = useAppStore();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  
  // 虽然我们在LESS中定义了样式，但为了保持与Vue版本一致的视觉效果（如背景色），可以使用token
  // 不过Vue版本直接用了 theme="light"，AntD Sider默认就是白色背景（如果指定了theme="light"）
  
  const menuItems = [
    {
      key: 'new_chat',
      icon: <PlusCircleFilled style={{ color: '#1890ff', fontSize: '18px' }} />,
      label: '新聊天',
    },
    {
      key: 'documents',
      icon: <FileTextOutlined />,
      label: '文档与云盘',
    },
    {
      type: 'group' as const,
      label: '聊天记录',
      key: 'grp1',
      children: [
        { key: 'history1', label: '暂无会话', disabled: true },
      ],
    },
    {
      type: 'group' as const,
      label: '文档',
      key: 'grp2',
      children: [
        { key: 'doc1', label: '暂无文档', disabled: true },
      ],
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isSiderCollapsed}
      theme="light"
      width={260}
      className="custom-sider"
    >
      <div className="sider-header">
        <button onClick={toggleSider} className="trigger-btn">
          {isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>

        {!isSiderCollapsed && (
          <div className="logo-icon">
             <img src={logoIcon} style={{ height: 32 }} alt="logo" />
          </div>
        )}
        {!isSiderCollapsed && <span className="logo-text">WisePen</span>}
      </div>

      <div className="menu-container">
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[currentView]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          onClick={({ key }) => {
              if (key === 'documents') {
                  setCurrentView('documents');
              }
              // Handle other keys
          }}
          items={menuItems}
          className="custom-menu"
        />
      </div>

      <div className="sider-footer">
        <Avatar size="small" style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>US</Avatar>
        {!isSiderCollapsed && (
          <div className="user-info">
            <span className="username">user_1008</span>
            <span className="user-tag">FREE</span>
          </div>
        )}
        {!isSiderCollapsed && <DownOutlined className="footer-icon" />}
      </div>
    </Sider>
  );
};

