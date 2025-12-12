import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <Card title="登录 WisePen" style={{ width: 300 }}>
        <Button type="primary" block onClick={() => navigate('/app')}>
          模拟登录
        </Button>
      </Card>
    </div>
  );
};
export default Login;