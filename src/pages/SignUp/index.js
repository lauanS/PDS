import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import React from 'react';
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
            <Form
                name="SignUp"
                onFinish={handleSubmit}
                form={form}
            >
                <Form.Item
                    label="Nome completo"
                    name="name"
                    rules={[{ required: true, message: 'Por favor, digite o seu nome completo.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, digite o seu endereço de e-mail.' }]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        { required: true, message: 'Por favor, digite a senha.' },
                        { min: 8, message: 'A senha deve conter pelo menos 8 caracteres.'}
                    ]}
                    hasFeedback
                >
                    <Input.Password />
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
                    <Input.Password />
                </Form.Item>

                <Row align="center">
                    <Form.Item>
                        <Button type="default" htmlType="submit">
                            Cadastrar
                </Button>
                    </Form.Item>
                </Row>

            </Form>
        </Layout>
    );
}

