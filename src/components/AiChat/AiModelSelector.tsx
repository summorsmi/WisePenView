import React, { useState, useMemo } from 'react';
import { Popover, Dropdown, Menu, Tag, Tooltip, theme } from 'antd';
import {
  DownOutlined,
  CheckOutlined,
  EyeOutlined,
  FireOutlined,
  DeploymentUnitOutlined,
  AliwangwangOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  CodeOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import './AiModelSelector.less';

interface AiModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet 3.5',
    icon: FireOutlined,
    color: '#D97706',
    tags: [{ text: 'New', type: 'purple' }],
    multiplier: '25x',
    vision: true,
    usageRank: 1,
    category: 'reasoning',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    icon: DeploymentUnitOutlined,
    color: '#10A37F',
    tags: [],
    multiplier: '17x',
    vision: true,
    usageRank: 2,
    category: 'all-round',
  },
  {
    id: 'doubao-pro',
    name: '豆包 Seed 1.6',
    icon: AliwangwangOutlined,
    color: '#1677FF',
    tags: [{ text: 'Free', type: 'success' }],
    multiplier: null,
    vision: false,
    usageRank: 6,
    category: 'chat',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    icon: DeploymentUnitOutlined,
    color: '#4F46E5',
    tags: [{ text: 'Reasoning', type: 'blue' }],
    multiplier: '7x',
    vision: false,
    usageRank: 4,
    category: 'reasoning',
  },
  {
    id: 'grok-4-fast',
    name: 'Grok 4.1 Fast',
    icon: DeploymentUnitOutlined,
    color: '#000000',
    tags: [{ text: 'Free', type: 'success' }],
    multiplier: '1x',
    vision: true,
    usageRank: 5,
    category: 'chat',
  },
  {
    id: 'claude-haiku',
    name: 'Claude Haiku 3',
    icon: FireOutlined,
    color: '#D97706',
    tags: [],
    multiplier: '8x',
    vision: false,
    usageRank: 3,
    category: 'chat',
  },
];

const sortOptions = [
  { label: '按使用量', value: 'usage', icon: RiseOutlined },
  { label: '按字母', value: 'alpha', icon: SortAscendingOutlined },
  { label: '推理模型', value: 'reasoning', icon: AppstoreOutlined },
  { label: '编程模型', value: 'coding', icon: CodeOutlined },
];

export const AiModelSelector: React.FC<AiModelSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('usage');
  const { token } = theme.useToken();

  const currentModel = useMemo(() => models.find((m) => m.id === value) || models[0], [value]);

  const listTitle = useMemo(() => {
    const map: Record<string, string> = {
      usage: '行业排名（按使用量）',
      alpha: '所有模型（A-Z）',
      reasoning: '深度推理模型',
      coding: '代码生成模型',
    };
    return map[currentSort] || '模型列表';
  }, [currentSort]);

  const processedModels = useMemo(() => {
    let list = [...models];
    switch (currentSort) {
      case 'usage':
        return list.sort((a, b) => a.usageRank - b.usageRank);
      case 'alpha':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'reasoning':
        return list.filter((m) => m.category === 'reasoning');
      case 'coding':
        return list.filter((m) => m.category === 'coding');
      default:
        return list;
    }
  }, [currentSort]);

  const handleSelect = (modelId: string) => {
    onChange(modelId);
    setIsOpen(false);
  };

  const sortMenu = (
    <Menu
      onClick={({ key }) => setCurrentSort(key as string)}
      selectedKeys={[currentSort]}
      items={sortOptions.map((opt) => ({
        key: opt.value,
        label: opt.label,
        icon: <opt.icon />,
      }))}
    />
  );

  const content = (
    <div className="selector-panel">
      <div className="panel-header">
        <span className="header-title">{listTitle}</span>
        <Dropdown overlay={sortMenu} trigger={['click']}>
          <div className="header-sort">
            {sortOptions.find((o) => o.value === currentSort)?.label}
            <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
          </div>
        </Dropdown>
      </div>

      <div className="model-list">
        {processedModels.map((model, index) => {
           const Icon = model.icon;
           return (
            <div
              key={model.id}
              className={`model-item ${model.id === value ? 'active' : ''}`}
              onClick={() => handleSelect(model.id)}
            >
              {currentSort === 'usage' && <div className="rank-num">#{index + 1}</div>}
              
              <div className="item-left">
                <div className="icon-wrapper">
                  <Icon style={{ color: model.color, fontSize: '16px' }} />
                </div>
                <div className="model-name">
                  <span className="name-text">{model.name}</span>
                </div>
                {model.vision && (
                  <Tooltip title="支持视觉识别">
                    <EyeOutlined className="vision-icon" />
                  </Tooltip>
                )}
                <div className="tags-row">
                  {model.tags?.map((tag, idx) => (
                    <Tag key={idx} bordered={false} color={tag.type} className="custom-tag">
                      {tag.text}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="item-right">
                {model.multiplier && <Tag className="multiplier" bordered={false}>{model.multiplier}</Tag>}
                {model.id === value && <CheckOutlined className="check-icon" />}
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );

  const CurrentIcon = currentModel.icon;

  return (
    <Popover
      content={content}
      trigger="click"
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="topRight"
      overlayClassName="model-selector-popover"
      arrow={false}
    >
      <div className="model-trigger">
        <CurrentIcon style={{ color: currentModel.color }} />
        <span className="trigger-text">{currentModel.name}</span>
        <DownOutlined className="arrow-icon" />
      </div>
    </Popover>
  );
};

