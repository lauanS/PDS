import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout/index';

import { postSignUp } from "../../services/index";

import './styles.css';

export default function SignUp() {

    const [form] = Form.useForm();

    const checkMatchingPasswords = (rule, value, callback) => {
        const password = form.getFieldValue('password');
        const passwordConfirmation = form.getFieldValue('passwordConfirmation');

        if (value && password !== passwordConfirmation) {
            callback("As senhas digitadas não correspondem. Por favor, digite novamente.");
        }
        else
            callback();
    }

    const handleSubmit = async e => {
        const obj = {
            nome: e.name,
            email: e.email,
            password: e.password
        }

        postSignUp(obj);
    }

    return (
        <Layout>
            <div className="container">
                <Form
                    name="SignUp"
                    onFinish={handleSubmit}
                    form={form}
                    layout="vertical"
                >
                    <div className="form-container">
                        <Form.Item
                            label="Nome completo"
                            name="name"
                            rules={[{ required: true, message: 'Por favor, digite o seu nome completo.' }]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="Nome completo"
                            />
                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[{ required: true, message: 'Por favor, digite o seu endereço de e-mail.' }]}
                        >
                            <Input 
                                type="email"
                                prefix={<MailOutlined />}
                                placeholder="Endereço de e-mail"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Senha"
                            name="password"
                            rules={[
                                { required: true, message: 'Por favor, digite a senha.' },
                                { min: 8, message: 'A senha deve conter pelo menos 8 caracteres.' }
                            ]}
                            hasFeedback
                        >
                            <Input.Password 
                                prefix={<LockOutlined />}
                                placeholder="Senha"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirmar senha"
                            name="passwordConfirmation"
                            rules={[
                                { required: true, message: 'Por favor, digite a senha novamente.' },
                                { validator: checkMatchingPasswords }
                            ]}
                            dependencies={['password']}
                            hasFeedback
                        >
                            <Input.Password 
                                prefix={<LockOutlined />}
                                placeholder="Confirmar senha"
                            />
                                Já possui uma conta? <a href="">Faça login.</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="signup-button">
                                Cadastrar
                                </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Layout>
    );
}

