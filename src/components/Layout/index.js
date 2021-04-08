import { Layout, Menu, Button } from 'antd';
import { UploadOutlined, LoginOutlined, VideoCameraOutlined } from '@ant-design/icons';

import Map from '../Gmaps/index'
import './styles.css';

const { Header, Content, Footer, Sider } = Layout;

export default function Main_Layout() {
    return(    
    <Layout className="main-layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', color: 'white' }}>
        SalvaCão
      </Header>
      <Layout className="content-layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<LoginOutlined />}>
              Login
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Minhas denúncias
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Denunciar
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Map />
        </Content>
      </Layout>      
    </Layout>
    );
}