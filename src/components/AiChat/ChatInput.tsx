import React, { useState } from 'react';
import { Input, Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  SearchOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { AiModelSelector } from './AiModelSelector';
import './ChatInput.less';

const { TextArea } = Input;

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentModelId, setCurrentModelId] = useState('grok-4-fast');

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      triggerSend();
    }
  };

  const triggerSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <div className="ai-input-wrapper">
      <div className="input-card">
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 5 }}
          bordered={false}
          className="custom-textarea"
          onKeyDown={handleEnter}
        />

        <div className="toolbar-row">
          <div className="tools-left">
            <Tooltip title="上传">
              <Button type="text" size="small" className="tool-btn" icon={<PlusOutlined />} />
            </Tooltip>
            <Tooltip title="设置">
              <Button type="text" size="small" className="tool-btn" icon={<SettingOutlined />} />
            </Tooltip>
            <Tooltip title="搜索">
              <Button type="text" size="small" className="tool-btn" icon={<SearchOutlined />} />
            </Tooltip>
          </div>

          <div className="tools-right">
            <AiModelSelector value={currentModelId} onChange={setCurrentModelId} />

            <Button
              type="primary"
              shape="circle"
              size="small"
              disabled={!inputValue.trim()}
              className="send-btn"
              onClick={triggerSend}
              icon={<SendOutlined />}
            />
          </div>
        </div>
      </div>

      <div className="footer-tip">AI 内容仅供参考，请仔细甄别</div>
    </div>
  );
};

