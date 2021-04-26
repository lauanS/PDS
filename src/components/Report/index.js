import React from 'react';
import { Button, Form, Input, Switch } from 'antd';

import { postReport } from "../../services/index";

export default function Report(props){
    const { lat, lng, adress  } = props;

    const handleSubmit = async e => {
        const obj = {
            lat:lat,
            lng:lng,
            isAnonymous:e.isAnonymous,
            animal:e.animal,
            breeds:e.breeds,
            adress: e.adress,
            description: e.description
        }

        postReport(obj);
        console.log(e);
    }

    return (
        <Form
            name="Report"
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{adress: adress}}
        >
            <Form.Item
                label="Localização"
                name={'adress'}
                rules={[
                    {
                        required: true,
                        message: 'Por favor, selecione uma localização no mapa',
                    },
                ]}
            >
                <Input type='text' />
            </Form.Item>

            <Form.Item
                label="Espécie"
                name={'animal'}
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
                name={"breeds"}
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
                name={ 'isAnonymous' }
                valuePropName="checked"
                initialValue={false}
            >
                <Switch/>
            </Form.Item>

            <Form.Item
                label="Descrição da denúncia"
                name={'description'}
                rules={[
                    {
                        required: true,
                        message: 'Por favor, digite uma descrição detalhada do problema',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item>
                <Button type="default" htmlType="submit">
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    );
}