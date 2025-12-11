import React, { useState, useMemo } from 'react';
import { Button, Input, Dropdown, Menu, Avatar, theme } from 'antd';
import {
  PlusOutlined,
  DownOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  MoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './FileManager.less';

interface FileItem {
  id: number;
  name: string;
  type: 'doc' | 'sheet';
  owner: string;
  updatedAt: string;
  icon: React.ElementType;
}

const filesData: FileItem[] = [
  {
    id: 1,
    name: '未命名文档',
    type: 'doc',
    owner: 'user_1008',
    updatedAt: '大约 5 小时前',
    icon: FileTextOutlined,
  },
  {
    id: 2,
    name: '英语作文1',
    type: 'doc',
    owner: 'user_1008',
    updatedAt: '2 天前',
    icon: FileTextOutlined,
  },
  {
    id: 3,
    name: '英语作文2',
    type: 'sheet',
    owner: 'Admin',
    updatedAt: '1 周前',
    icon: FileTextOutlined,
  },
];

export const FileManager: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'docs' | 'images'>('docs');
  const [searchText, setSearchText] = useState('');
  const { token } = theme.useToken();

  const filteredFiles = useMemo(() => {
    if (!searchText) return filesData;
    return filesData.filter((f) => f.name.includes(searchText));
  }, [searchText]);

  const newMenu = (
    <Menu
      items={[
        { key: '1', label: '新建文档' },
        { key: '2', label: '新建文件夹' },
      ]}
    />
  );

  return (
    <div className="file-manager-container">
      <header className="manager-header">
        <div className="header-title-area">
          <h1 className="page-title">文档与云盘</h1>
          <p className="page-subtitle">管理您的项目和文档</p>
        </div>

        <div className="header-actions">
          <Dropdown overlay={newMenu} trigger={['click']}>
            <Button type="primary" className="btn-new" icon={<PlusOutlined />}>
              新建 <DownOutlined className="icon-xs" />
            </Button>
          </Dropdown>

          <Button className="btn-upload" icon={<UploadOutlined />}>
            上传
          </Button>

          <Button className="btn-icon-only" icon={<UnorderedListOutlined />} />
        </div>
      </header>

      <div className="filter-bar">
        <div className="custom-tabs">
          <div
            className={`tab-item ${currentTab === 'docs' ? 'active' : ''}`}
            onClick={() => setCurrentTab('docs')}
          >
            文档
          </div>
          <div
            className={`tab-item ${currentTab === 'images' ? 'active' : ''}`}
            onClick={() => setCurrentTab('images')}
          >
            图片
          </div>
        </div>

        <div className="search-wrapper">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索项目或文档..."
            className="custom-search"
            prefix={<SearchOutlined style={{ color: '#ccc' }} />}
          />
        </div>
      </div>

      <div className="file-list-area">
        <div className="list-header">
          <div className="col-name">名称</div>
          <div className="col-owner">所有者</div>
          <div className="col-date">最近更新</div>
          <div className="col-action"></div>
        </div>

        <div className="list-body">
          {filteredFiles.map((file) => {
            const Icon = file.icon;
            return (
              <div key={file.id} className="file-row">
                <div className="col-name">
                  <div className="file-icon-wrapper">
                    <Icon />
                  </div>
                  <span className="file-name-text">{file.name}</span>
                </div>

                <div className="col-owner">
                  <Avatar size="small" style={{ background: '#f56a00', marginRight: 8 }}>
                    U
                  </Avatar>
                  {file.owner}
                </div>

                <div className="col-date">{file.updatedAt}</div>

                <div className="col-action">
                  <Button type="text" size="small" className="btn-more" icon={<MoreOutlined />} />
                </div>
              </div>
            );
          })}
          <div className="list-footer">没有更多了</div>
        </div>
      </div>
    </div>
  );
};

