import React from 'react';
import { Button, Input, Typography, Space } from 'antd';
import { CloseOutlined, SendOutlined, RobotOutlined, PlusOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/useAppStore';
import './AIChatPanel.scss';

const { Title, Text } = Typography;

export const AIChatPanel: React.FC = () => {
  const { toggleAIChat } = useAppStore();

  return (
    <div className="ai-chat-panel">
      <div className="chat-header">
        <Title level={5} style={{ margin: 0 }}>新建的 AI 对话</Title>
        <Space>
            <Button type="text" icon={<PlusOutlined />} />
            <Button type="text" icon={<ExpandAltOutlined />} />
            <Button type="text" icon={<CloseOutlined />} onClick={toggleAIChat} />
        </Space>
      </div>

      <div className="chat-body">
         <div className="empty-state">
             <div className="bot-avatar">
                 <RobotOutlined style={{ fontSize: 40 }} />
             </div>
             <Title level={4}>你好，我是AI助理小W</Title>
             <Title level={4} style={{ marginTop: 0, color: '#1677ff' }}>今天想做点什么？</Title>
         </div>
      </div>

      <div className="chat-footer">
          <Input.Search 
            placeholder="输入消息..." 
            enterButton={<SendOutlined />} 
            size="large"
          />
          <Text type="secondary" style={{ fontSize: 10, display: 'block', textAlign: 'center', marginTop: 8 }}>
             AI 内容仅供参考，请仔细甄别
          </Text>
      </div>
    </div>
  );
};
