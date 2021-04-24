import React, { useState } from 'react';
import { Button, Form, Input, Switch } from 'antd';

import Layout from '../../components/Layout/index';

const layout = {
    labelCol: {
        span: 8,
        offset: 1,

    },
    wrapperCol: {
        span: 16,
        offset: 2,
        pull: 1,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 1,
        span: 8,
    },
};

const handleSubmit = async e => {
    console.log(e)
}


const initialValue = '0.0000, 0.0000'

export default function Report(){
    return (
        <Layout>
            <Form
                {...layout}
                name="Report"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Localização"
                    name={['local']}
                    initialValue={[initialValue]}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, selecione uma localização no mapa',
                        },
                    ]}
                >
                    <Input type='text'
                           placeholder={[initialValue]}
                           disabled
                    />

                </Form.Item>
                <Form.Item
                    label="Descrição da denúncia"
                    name={['descricao']}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, digite uma descrição detalhada do problema',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Espécie"
                    name={['especie']}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, digite a espécie do animal (ex.: cachorro, gato etc)',
                        },
                    ]}
                >

                    <Input type='text' placeholder="Digite a espécie do animal (ex.: cachorro)" />

                </Form.Item>

                <Form.Item
                    label="Raça"
                    name={['raca']}
                    rules={[
                        {
                            required: false,
                            message: 'Por favor, digite a raça do animal (ex.: pastor alemão)',
                        },
                    ]}
                >

                    <Input type='text' placeholder="Digite a raça do animal (ex.: pastor alemão)" />

                </Form.Item>

                <Form.Item
                    label="Denunciar de forma anônima"
                    name={ ['anonimo'] }
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}