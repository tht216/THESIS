import {
  FieldTimeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // PicRightOutlined,
  FormOutlined,
  SettingOutlined,
  PoweroffOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./style/home.css";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Customer from "../../Pages/Customer";
import Company from "../../Pages/Company";
import Service from "../../Pages/Service";
// import Pickup from "../../Pages/Pickup";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/dashboard", <FieldTimeOutlined />),
  getItem("Customer Management", "/customer", <UserOutlined />),
  getItem("Company Management", "/company", <BankOutlined />),
  getItem("Service Management", "/service", <FormOutlined />),
  // getItem("Pickup Management", "/pickup", <PicRightOutlined />),
];
const menu1 = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Change Password
          </a>
        ),
        icon: <SettingOutlined />,
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </a>
        ),
        icon: <PoweroffOutlined />,
      },
    ]}
  />
);
const menu2 = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            vi Vietnamese
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            en English
          </a>
        ),
      },
    ]}
  />
);
const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(window.location.pathname);
    }
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff",
        }}
        width={250}
        className="sidebar"
      >
        <div className="logo">
          {/* <img alt="Error" src="" /> */}
          <a href="">{!collapsed ? "HT GARBAGE" : ""}</a>
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key) && setSelectedKey(key)}
          selectedKeys={window.location.pathname}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="right">
            <Dropdown overlay={menu1}>
              <a onClick={(e) => e.preventDefault()} href="/#">
                <div className="account">
                  <img alt="Error" src="https://picsum.photos/200/300" />
                  <p>Admineh</p>
                </div>
              </a>
            </Dropdown>
            <Dropdown overlay={menu2}>
              <a onClick={(e) => e.preventDefault()} href="/#">
                <div className="language">
                  <GlobalOutlined />
                </div>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/customer" element={<Customer />} />
            <Route exact path="/company" element={<Company />} />
            <Route exact path="/service" element={<Service />} />
            {/* <Route exact path="/pickup" element={<Pickup />} /> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
