import React, { useState, useRef } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import Layout from '../../components/Layout/index';

import { postSignIn } from "../../services/index";
import { login } from "../../services/auth";
import './styles.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(true);
  const [form] = Form.useForm();

  const handleSignIn = async (e) => {
    setIsLoading(true);

    const obj = {
      email: e.email,
      password: e.password 
    }

    try {
      const res = await postSignIn(obj);
      
      if(mounted.current){
        login(res.data.token);
        // window.location.reload();
      }
    } catch(error){
      if(mounted.current){
        console.log("Erro ao realizar o login");
        console.log(error);
        form.resetFields();
      }
    }
    setIsLoading(false);
  };

    return (
        <Layout>
          <div className="container">
            <Form
              name="Login"
              initialValues={{ remember: true }}
              className="login-form"
              layout="vertical"  
              form={form}
              onFinish={handleSignIn}              
            >
              <div className="form-container">
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[{ required: true, message: 'Por favor, digite o seu endereço de e-mail!' }]}
                >
                  <Input
                    type="email"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Endereço de e-mail"
                    disabled={isLoading}
                  />
                </Form.Item>

                <Form.Item
                  label="Senha"
                  name="password"
                  rules={[{ required: true, message: 'Por favor, digite a senha!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Senha"
                    disabled={isLoading}
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Lembre-se de mim</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button"
                    loading={isLoading}
                  >
                    Entrar
                  </Button>
                </Form.Item>
              </div>
              Não possui registro? <a href="">Cadastre-se!</a>
            </Form>
          </div>
        </Layout>
    );
}