import React, { useState } from 'react';
import { Button } from 'antd';
import { RiAddLine } from 'react-icons/ri';
import ModelSelector from './ModelSelector';
import MessageList from './MessageList';
import type { Message } from './MessageList';
import ChatInput from './ChatInput';
import styles from './style.module.less';

const ChatPanel: React.FC = () => {
  const [currentModelId, setCurrentModelId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = (text: string) => {
    // 1. 添加用户消息
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // 2. 模拟 AI 回复 (实际项目中这里会调用 API)
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `我是 ${currentModelId}，我收到了你的消息：${text}`,
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <ModelSelector value={currentModelId} onChange={setCurrentModelId} />
        <Button type="text" icon={<RiAddLine />} onClick={startNewChat}>
            新话题
        </Button>
      </div>

      {/* Message List */}
      <MessageList messages={messages} />

      {/* Input Area */}
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
};

export default ChatPanel;