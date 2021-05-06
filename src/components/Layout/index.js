import { useContext } from "react";

import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

import { Link } from "react-router-dom";

import { Context } from "../../context/authContext";

import "./styles.css";
import PetIcon from "../icons/PetIcon";

const { Header, Content, Sider } = Layout;

export default function Main_Layout(props) {
  const { isAuthenticated, isAdmin, handleLogout } = useContext(Context);

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
          <Link
            to="/"
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <PetIcon className="header-logo" fill="#FFFFFF" />
          </Link>
          <Link className="header-text" to="/">
            SalvaCão
          </Link>
        </div>
      </Header>
      <Layout className="content-layout">
        <Sider className="sider-layout" breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            {isAuthenticated() ? (
              <Menu.Item
                key="1"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
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
                Painel de controle
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
