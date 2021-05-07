import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";

import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { GoogleLogin } from "react-google-login";

import { postSignUp, postGoogleSignIn } from "../../services/index";

import { Context } from "../../context/authContext";

import "./styles.css";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(true);

  let history = useHistory();

  const { handleLogin, setAdminFlag } = useContext(Context);
  const [form] = Form.useForm();

  const checkMatchingPasswords = (rule, value, callback) => {
    const password = form.getFieldValue("password");
    const passwordConfirmation = form.getFieldValue("passwordConfirmation");

    if (value && password !== passwordConfirmation) {
      callback(
        "As senhas digitadas não correspondem. Por favor, digite novamente."
      );
    } else callback();
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    const obj = {
      name: e.name,
      email: e.email,
      password: e.password,
    };

    try {
      console.log(await postSignUp(obj));

      if (mounted.current) {
        message
          .success("Cadastro/Login realizado com sucesso", 2)
          .then(() => history.push("/login"));
      }
    } catch (error) {
      if (mounted.current) {
        message.error("Não foi possível completar o cadastro");
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    const obj = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      token: response.tokenId,
    };
    try {
      const data = await postGoogleSignIn(obj);

      if (mounted.current) {
        handleLogin(data.token);
        message
          .success("Login realizado com sucesso", 2)
          .then(() => history.push("/"));
      }
    } catch (error) {
      if (mounted.current) {
        console.log("Erro ao tentar cadastrar um novo usuário");
        console.log(error);
        form.resetFields();
        message.error("Não foi possível realizar o cadastro pelo Google");
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <Form
          className="SignUp"
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
        >
          <div className="form-container">
            <Form.Item
              label="Nome completo"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, digite o seu nome completo.",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nome completo"
                disabled={isLoading}
              />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor, digite o seu endereço de e-mail.",
                },
              ]}
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
                { required: true, message: "Por favor, digite a senha." },
                {
                  min: 8,
                  message: "A senha deve conter pelo menos 8 caracteres.",
                },
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
                {
                  required: true,
                  message: "Por favor, digite a senha novamente.",
                },
                { validator: checkMatchingPasswords },
              ]}
              dependencies={["password"]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirmar senha"
                disabled={isLoading}
              />
            </Form.Item>
            <Form.Item className="form-item-button">
              <Button
                type="primary"
                htmlType="submit"
                className="signup-button"
                loading={isLoading}
              >
                Cadastrar
              </Button>
            </Form.Item>
            Já possui uma conta? <Link to="/login"> Faça login.</Link>
            <div className="separator">
              <div className="horizontal-bar"></div>
              <h4>OU</h4>
              <div className="horizontal-bar"></div>
            </div>
            <div className="google-login">
              <GoogleLogin
                clientId="316764013062-k4otr5duv097p0rivipquavfhsdbckcd.apps.googleusercontent.com"
                buttonText="Registre-se com Google"
                //isSignedIn={true} //Manter logado
                onSuccess={handleGoogleLogin}
                theme="dark"
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
