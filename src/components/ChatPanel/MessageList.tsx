import React, { useEffect, useRef } from 'react';
import { Avatar } from 'antd';
import { RiRobot2Line, RiUserSmileLine } from 'react-icons/ri';
import clsx from 'clsx';
import styles from './style.module.less';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 监听消息变化，自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.messageList}>
        <div className={styles.welcome}>
          <RiRobot2Line className={styles.mascot} />
          <h2>你好，我是 AI 助理小 W</h2>
          <p>今天想做点什么？</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messageList} ref={scrollRef}>
      {messages.map((msg) => (
        <div key={msg.id} className={clsx(styles.messageRow, styles[msg.role])}>
          {/* 头像 */}
          <div className={clsx(styles.avatar, msg.role === 'ai' ? styles.aiAvatar : styles.userAvatar)}>
             {msg.role === 'ai' ? <RiRobot2Line size={20} /> : <RiUserSmileLine size={20} />}
          </div>
          
          {/* 气泡 */}
          <div className={styles.bubble}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;