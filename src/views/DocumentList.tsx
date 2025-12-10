import React from 'react';
import { Typography, Button, Input, Tabs, Table, Space, Avatar, Dropdown } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  UploadOutlined, 
  AppstoreOutlined, 
  BarsOutlined, 
  MoreOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import './DocumentList.scss';

const { Title, Text } = Typography;

const data = [
  {
    key: '1',
    name: '未命名文档',
    owner: 'user_1008',
    updated: '大约 5 小时前',
    icon: <FileTextOutlined />,
  },
  {
    key: '2',
    name: '英语作文 1',
    owner: 'user_1008',
    updated: '2 天前',
    icon: <FileTextOutlined />,
  },
  {
    key: '3',
    name: '英语作文 2',
    owner: 'Admin',
    updated: '1 周前',
    icon: <FileTextOutlined />,
  },
];

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: any) => (
      <Space>
        {record.icon}
        <Text strong>{text}</Text>
      </Space>
    ),
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    key: 'owner',
    render: (text: string) => (
      <Space>
        <Avatar size="small" style={{ backgroundColor: '#f56a00' }}>{text[0]}</Avatar>
        <Text>{text}</Text>
      </Space>
    ),
  },
  {
    title: '最近更新',
    dataIndex: 'updated',
    key: 'updated',
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
  {
    title: '',
    key: 'action',
    render: () => <Button type="text" icon={<MoreOutlined />} />,
  },
];

export const DocumentList: React.FC = () => {
  return (
    <div className="document-list-view">
      <div className="header-actions">
          <div className="left-title">
             <Title level={3} style={{ margin: 0 }}>文档与云盘</Title>
             <Text type="secondary">管理您的项目和文档</Text>
          </div>
          <div className="right-actions">
             <Space>
                 <Button type="primary" icon={<PlusOutlined />}>新建</Button>
                 <Button icon={<UploadOutlined />}>上传</Button>
                 <Button icon={<BarsOutlined />} />
             </Space>
          </div>
      </div>

      <div className="filter-bar">
         <Tabs 
            defaultActiveKey="1" 
            items={[
                { key: '1', label: '文档' }, 
                { key: '2', label: '图片' }
            ]} 
            style={{ flex: 1 }}
         />
         <Input 
            prefix={<SearchOutlined />} 
            placeholder="搜索项目或文档..." 
            style={{ width: 300 }} 
         />
      </div>

      <div className="content-area">
          <Table 
             dataSource={data} 
             columns={columns} 
             pagination={false} 
             rowSelection={{ type: 'checkbox' }}
          />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
             <Text type="secondary" style={{ fontSize: 12 }}>没有更多了</Text>
          </div>
      </div>
    </div>
  );
};
