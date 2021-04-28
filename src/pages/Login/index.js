import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import React from 'react';
import Layout from '../../components/Layout/index';

import './styles.css';

export default function Login() {
    return (
        <Layout>
            <Form
                name="Login"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, digite o seu endereço de e-mail!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor, digite a senha!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Lembre-se de mim</Checkbox>
                </Form.Item>

                <Row align="center">
                    <Form.Item>
                        <Button type="default" htmlType="submit">
                            Entrar
                    </Button>
                    </Form.Item>
                </Row>

            </Form>
        </Layout>
    );
}