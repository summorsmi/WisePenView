import React from 'react';
import { Tabs, Input, Button, Table, Avatar } from 'antd';
// 引入图标
import { AiOutlinePlus, AiOutlineCloudUpload, AiOutlineSearch, AiOutlineFileText } from 'react-icons/ai';

const DriveList: React.FC = () => {
  // 模拟数据
  const dataSource = [
    { key: '1', name: '未命名文档', owner: 'user_1008', date: '大约 5 小时前' },
    { key: '2', name: '英语作文1', owner: 'user_1008', date: '2 天前' },
    { key: '3', name: '英语作文2', owner: 'Admin', date: '1 周前' },
  ];

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
          <AiOutlineFileText size={18} color="#666" />
          {text}
        </div>
      ),
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      key: 'owner',
      render: (text: string) => (
         <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Avatar size={20} style={{ backgroundColor: '#f56a00', fontSize: 12 }}>U</Avatar>
            <span>{text}</span>
         </div>
      )
    },
    {
      title: '最近更新',
      dataIndex: 'date',
      key: 'date',
      width: 200,
      render: (text: string) => <span style={{ color: '#999' }}>{text}</span>,
    },
  ];

  return (
    <div style={{ padding: '24px 40px', maxWidth: 1200, margin: '0 auto' }}>
      {/* 标题头 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, margin: '0 0 4px 0' }}>文档与云盘</h1>
          <span style={{ color: '#888' }}>管理您的项目和文档</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button type="primary" icon={<AiOutlinePlus size={16} />}>新建</Button>
          <Button icon={<AiOutlineCloudUpload size={16} />}>上传</Button>
        </div>
      </div>

      {/* Tabs 和 搜索 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}>
        <Tabs 
          items={[{ key: '1', label: '文档' }, { key: '2', label: '图片' }]} 
          style={{ marginBottom: -1 }} 
        />
        <Input 
            prefix={<AiOutlineSearch size={14} color="#ccc" />} 
            placeholder="搜索项目或文档..." 
            style={{ width: 240, borderRadius: 20, marginBottom: 10 }}
        />
      </div>

      {/* 表格 */}
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false} 
        rowSelection={{}}
      />
      
      <div style={{ textAlign: 'center', marginTop: 32, color: '#ccc' }}>没有更多了</div>
    </div>
  );
};

export default DriveList;