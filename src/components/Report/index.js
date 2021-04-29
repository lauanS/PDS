import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Switch } from 'antd';

import { postReport } from "../../services/index";

export default function Report(props){
  const { lat, lng, address, onFinish } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(true);

  const handleSubmit = async e => {
    setIsLoading(true);
    const obj = {
      id: new Date().getTime(),
      lat:lat,
      lng:lng,
      date: 'X',            
      animal:e.animal,
      breeds:e.breeds,
      address: e.address,
      description: e.description,
      status: 'opened',
      isAnonymous:e.isAnonymous
    }
    console.log(obj);
    await postReport(obj);
    form.resetFields();
    await onFinish();
    
    if(mounted.current){
      setIsLoading(false);
    }
  }

  /* Atualiza o status do mounted ao desmontar o componente para impedir vazamento de memória */
  useEffect(() => {
    return () => {mounted.current = false} 
  }, []);

  return (
    <Form
      form={form}
      name="Report"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{address: address}}
    >
      <Form.Item
        label="Localização"
        name={'address'}
        rules={[
                {
                  required: true,
                  message: 'Por favor, selecione uma localização no mapa',
                },
              ]}
      >
        <Input type='text' disabled={isLoading}/>
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

        <Input 
          type='text' 
          disabled={isLoading} 
          placeholder="Digite a espécie do animal (ex.: cachorro)" 
        />
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
        <Input 
          type='text' 
          disabled={isLoading}
          placeholder="Digite a raça do animal (ex.: pastor alemão)" 
        />
      </Form.Item>

      <Form.Item
        label="Denunciar de forma anônima"
        name={ 'isAnonymous' }
        valuePropName="checked"
        initialValue={false}
      >
        <Switch disabled={isLoading}/>
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
        <Input.TextArea disabled={isLoading}/>
      </Form.Item>

      <Form.Item>
        <Button type="default" loading={isLoading} htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}