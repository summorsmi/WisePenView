import React, { useState } from 'react';
import { Layout, Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  ExpandAltOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../store/useAppStore';
import { ChatMessageList } from './AiChat/ChatMessageList';
import type { Message } from './AiChat/ChatMessageList';
import { ChatInput } from './AiChat/ChatInput';
import './AiSider.less';

const { Sider } = Layout;

export const AiSider: React.FC = () => {
  const { isAIChatOpen, setAIChatOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  
  // 模拟发送消息
  const handleSendMessage = (text: string) => {
    // 1. Add user message
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: `[Mock API] 我收到了你的请求: "${text}"。这里的回复逻辑在 AiSider 父组件中处理。`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <Sider
      width={400}
      collapsedWidth={0}
      collapsed={!isAIChatOpen}
      onCollapse={(collapsed) => setAIChatOpen(!collapsed)}
      trigger={null}
      theme="light"
      collapsible
      className="ai-sider"
    >
      <div className="ai-container">
        <div className="ai-header">
          <div className="header-left">
            <span className="title">新建的 AI 对话</span>
          </div>
          <div className="header-right">
            <Tooltip title="新对话">
              <Button type="text" size="small" onClick={handleNewChat} icon={<PlusOutlined />} />
            </Tooltip>
            <Tooltip title="全屏">
              <Button type="text" size="small" icon={<ExpandAltOutlined />} />
            </Tooltip>
            <Tooltip title="关闭">
              <Button type="text" size="small" onClick={() => setAIChatOpen(false)} icon={<CloseOutlined />} />
            </Tooltip>
          </div>
        </div>

        <ChatMessageList messages={messages} />
        
        <ChatInput onSend={handleSendMessage} />
      </div>
    </Sider>
  );
};

