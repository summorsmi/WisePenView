import React, { useEffect, useRef } from 'react';
import { RobotOutlined } from '@ant-design/icons';
import './ChatMessageList.less';

export interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

interface ChatMessageListProps {
  messages: Message[];
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="ai-message-list">
        <div className="welcome-view">
          <div className="mascot-area">
            <RobotOutlined className="mascot-icon" />
          </div>
          <h2 className="welcome-title">你好，我是AI助理小W</h2>
          <p className="welcome-subtitle">今天想做点什么？</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-message-list" ref={scrollRef}>
      <div className="message-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.role}`}>
            {msg.role === 'ai' && (
              <div className="avatar-container ai">
                <RobotOutlined />
              </div>
            )}
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

