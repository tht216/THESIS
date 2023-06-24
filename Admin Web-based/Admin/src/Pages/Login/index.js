import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Menu,
  Dropdown,
} from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  LockOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { asyncLoginAction } from "./stores/action";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading } from "./stores/selector";

import "./style/login.css";
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
const Login = (props) => {
  const navigate = useNavigate();
  const { loginAccountDispatch } = props;
  //   const { isLoading } = props;
  const onFinish = async (values) => {
    console.log(values)
    const res = await loginAccountDispatch(values);
    if (res.status === 200) {
      notification.open({
        message: "Đăng nhập",
        description: "Đăng nhập thành công",
        icon: <DownOutlined style={{ color: "green" }} />,
      });
      navigate("/dashboard");
      localStorage.setItem("token", res.data.token);
    } else {
      notification.open({
        message: "Đăng nhập",
        description: "Đăng nhập Thất bại",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
  };
  return (
    <div className="loginPage">
      <div className="container1">
        <div className="dd">
          <Dropdown overlay={menu2}>
            <a onClick={(e) => e.preventDefault()} href="/#">
              <div className="language">
                <GlobalOutlined />
              </div>
            </a>
          </Dropdown>
        </div>
        <div className="content">
          <a href="/login">Garbage Admin</a>
          <span>Web-based application for admin</span>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="authen">Authentication Page</div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Input email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Input Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});
const mapDispatchToProps = (dispatch) => ({
  loginAccountDispatch: (payload) => asyncLoginAction(dispatch)(payload),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Login);
