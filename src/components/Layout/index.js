import { useContext, useState } from "react";

import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

import { Link, useHistory } from "react-router-dom";

import { Context } from "../../context/authContext";

import "./styles.css";
import PetIcon from "../icons/PetIcon";

const { Header, Content, Sider } = Layout;

export default function Main_Layout(props) {
  const [collapsed, setCollapsed] = useState(true);
  const { isAuthenticated, isAdmin, handleLogout } = useContext(Context);
  let history = useHistory();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const hideCollapse = () => {
    if(!collapsed){
      setCollapsed(true);
    }
  }

  const onClickLogout = () => {
    handleLogout();
    history.push("/");
  }

  const MenuFoldIcon = collapsed? MenuUnfoldOutlined: MenuFoldOutlined;

  return (
    <Layout className="main-layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          color: "white",
          paddingLeft: 20,
        }}
      >
        <div className="header-container">
          <MenuFoldIcon onClick={toggleCollapse} style={{ fontSize: 25}}/>
          <Link
            to="/"
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <PetIcon className="header-logo" fill="#FFFFFF" onClick={hideCollapse}/>
          </Link>
          <Link className="header-text" to="/" onClick={hideCollapse}>
            SalvaCão
          </Link>
        </div>
      </Header>
      <Layout className="content-layout">
        <Sider className="sider-layout" trigger={null} collapsible collapsed={collapsed} breakpoint="lg" collapsedWidth="0" >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} onClick={hideCollapse}>
            {isAuthenticated() ? (
              <Menu.Item
                key="1"
                icon={<LogoutOutlined />}
                onClick={onClickLogout}
              >
                Sair
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="1" icon={<LoginOutlined />}>
                  <Link to="/login/">Login</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserAddOutlined />}>
                  <Link to="/cadastro/">Cadastre-se</Link>
                </Menu.Item>
              </>
            )}
            {isAuthenticated() && isAdmin() && (
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                <Link to="/control">Painel de controle</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
