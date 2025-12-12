import React, { useState } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { 
  RiAddLine, 
  RiSettings3Line, 
  RiSearchLine, 
  RiSendPlaneFill 
} from 'react-icons/ri';
import styles from './style.module.less';

interface Props {
  onSend: (text: string) => void;
  loading?: boolean;
}

const ChatInput: React.FC<Props> = ({ onSend, loading }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim() || loading) return;
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputCard}>
        <Input.TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 5 }}
          bordered={false}
          className={styles.textarea}
          onKeyDown={handleKeyDown}
        />
        
        <div className={styles.toolbar}>
          <div className={styles.toolsLeft}>
            <Tooltip title="上传"><Button type="text" size="small" className={styles.toolBtn} icon={<RiAddLine />} /></Tooltip>
            <Tooltip title="设置"><Button type="text" size="small" className={styles.toolBtn} icon={<RiSettings3Line />} /></Tooltip>
            <Tooltip title="搜索"><Button type="text" size="small" className={styles.toolBtn} icon={<RiSearchLine />} /></Tooltip>
          </div>
          
          <Button 
            type="primary" 
            shape="circle" 
            icon={<RiSendPlaneFill />} 
            disabled={!value.trim() || loading}
            onClick={handleSend}
          />
        </div>
      </div>
      <div className={styles.footerTip}>AI 内容仅供参考，请仔细甄别</div>
    </div>
  );
};

export default ChatInput;