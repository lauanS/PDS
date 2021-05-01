import { Layout, Menu } from 'antd';
import { UploadOutlined, LoginOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";

import './styles.css';
import { isAuthenticated, logout } from '../../services/auth';
import { useEffect, useState } from 'react';

const { Header, Content, Sider } = Layout;

export default function Main_Layout(props) {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  let history = useHistory();

  const onClickLogout = () => {
    logout();
    setIsAuth(false);
    history.push("/");
  }

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, []);

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
          {isAuth ? 
            <Menu.Item key="1" icon={<LoginOutlined />} onClick={onClickLogout}>
              Sair
            </Menu.Item>
            : 
            <>
            <Menu.Item key="1" icon={<LoginOutlined />}>
              <Link to="/login/">Login</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LoginOutlined />}>
              <Link to="/cadastro/">Cadastre-se</Link>
            </Menu.Item> 
            </>

          }

          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            Minhas denúncias
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
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