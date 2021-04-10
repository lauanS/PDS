import { Layout, Menu } from 'antd';
import { UploadOutlined, LoginOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import './styles.css';

const { Header, Content, Sider } = Layout;

export default function Main_Layout(props) {
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<LoginOutlined />}>
              <Link to="/login/">Login</Link>
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
          {props.children}
        </Content>
      </Layout>      
    </Layout>
    );
}