import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import React from 'react';
import Layout from '../../components/Layout/index';

import { postSignUp } from "../../services/index";

import './styles.css';

export default function SignUp() {

    const checkMatchingPasswords = (rule, value, callback) => {
        if (value) {
            const passwordConfirmation = getFieldValue('passwordConfirmation');
            console.log(value);
            if (value !== passwordConfirmation) {
                callback("As duas senhas não correspondem. Por favor, digite novamente.");
            }
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
                onFinish={ handleSubmit }
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
                    rules={[{ required: true, message: 'Por favor, digite a senha.' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirmar senha"
                    name="passwordConfirmation"
                    rules={[
                        { required: true, message: 'Por favor, digite a senha novamente.' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                
                              return Promise.reject(new Error('As senhas não correspondem. Por favor, digite novamente.'));
                            },
                          }),
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

