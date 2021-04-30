import React, { useState, useRef } from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Layout from '../../components/Layout/index';

import { postSignUp } from "../../services/index";

import './styles.css';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(true);

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
      setIsLoading(true);

      const obj = {
          nome: e.name,
          email: e.email,
          password: e.password
      }

      try {
        await postSignUp(obj);
        
        if(mounted.current){
          console.log("Trocar de página");
        }
      } catch(error){
        if(mounted.current){
          console.log("Erro ao tentar cadastrar um novo usuário");
          console.log(error);
          form.resetFields();
        }
      }
      setIsLoading(false);      
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                                Já possui uma conta? <a href="">Faça login.</a>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                              type="primary" 
                              htmlType="submit" 
                              className="signup-button" 
                              loading={isLoading}
                            >
                              Cadastrar
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Layout>
    );
}

