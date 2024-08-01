import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined , HomeFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import PlaysStationImage from '../assets/icons/PSN.png'
const { Header, Content, Footer, Sider } = Layout;
// const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
//   }),
// );

const items = [{
    label: 'Home',
    key: '/',
    icon: <HomeFilled />
},
    {
    label:'Sessions',
        key: '/sessions',
        icon: <UserOutlined />
    },
    {
        label: 'Devices',
        key: '/devices',
        icon: <UploadOutlined />
    },
    {
    label:'Games',
        key: '/games',
        icon: <VideoCameraOutlined />
    },
    {
        label: 'Users',
        key: '/users',
        // icon: <UserFilled />
    },
    {
        label: 'Dashboard',
        key: '/dashboard',
        icon: <VideoCameraOutlined />
    }
]
const LayoutA = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
          <Sider     
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
              {/* <div className="demo-logo-vertical" /> */}
              <div className="d-flex justify-content-center">
                  <img src={PlaysStationImage } width={100} alt="" />
              </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}    items={items} />
      </Sider>
      <Layout>
              <Header
                  
          style={{
            padding: 0,
            background: colorBgContainer,
                  }}
                  
              >
                  <p>Header</p>
                  
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutA;