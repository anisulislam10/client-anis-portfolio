import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  BookOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import Projects from './Projects';
import Blogs from './Blogs';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'projects':
        return <Projects />;
      case 'blogs':
        return <Blogs />;
      case 'dashboard':
      default:
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Projects" value={12} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Blogs" value={24} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Active Technologies" value={8} />
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          mode="inline"
          onSelect={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="projects" icon={<ProjectOutlined />}>
            Projects
          </Menu.Item>
          <Menu.Item key="blogs" icon={<BookOutlined />}>
            Blogs
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;