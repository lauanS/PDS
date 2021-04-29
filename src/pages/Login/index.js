import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout/index';

import './styles.css';

export default function Login() {
    return (
        <Layout>
            <div className="container">
                <Form
                    name="Login"
                    initialValues={{ remember: true }}
                    className="login-form"
                    layout="vertical"
                    
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
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Lembre-se de mim</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
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