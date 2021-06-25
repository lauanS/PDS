import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Form, Input, Switch, Select } from 'antd';

import { postFile, postReport } from "../../services/index";
import Editor from '../Editor';
import format from 'date-fns/format'
import { Context } from "../../context/authContext"

export default function Report(props){
  const { lat, lng, address, onFinish } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const { getUser, getEmail } = useContext(Context);
  const userName = getUser();

  const mounted = useRef(true);

  const handleSubmit = async e => {
    setIsLoading(true);
    const obj = {
      id: new Date().getTime(),
      lat:lat,
      lng:lng,
      date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"),            
      animal:e.animal,
      breeds:e.breeds ? e.breeds : "",
      address: e.address,
      description: e.description,
      status: 'opened',
      isAnonymous:e.isAnonymous,
      author: userName,
      userId: getEmail()
    }
    
    const report = (await postReport(obj)).data;
    attachedFiles.map((file) => {
      const objFile = {
        reportId: report.id, // Id da denúncia
        author: userName, // Nome de quem enviou o arquivo
        name: file.name, // Nome do arquivo (exemplo: img.png)
        fileBase64: file.fileBase64, // Arquivo base64
        size: file.size, // Tamanho do arquivo (em bytes)
        url: null, // URL no nosso servidor
      };
  
      postFile(objFile)
      .then((res) => {
        file.originFile.id = res.data.id;
      })
      .catch((_) => {
        new Error("Erro ao realizar o upload do arquivo");
      });
      return true;
    });

    form.resetFields();
    await onFinish();
    
    if(mounted.current){
      setIsLoading(false);
    }
  }

  const onAnimalChange = (value) => {
    form.setFieldsValue(value);
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
                  message: 'Por favor, selecione uma espécie.',
                },
              ]}
      >

        <Select
          placeholder="Selecione um animal..."
          onChange={onAnimalChange}
          allowClear
        >
          <Option value="Cabra">Cabra</Option>
          <Option value="Cacatua">Cacatua</Option>
          <Option value="Cachorro">Cachorro</Option>          
          <Option value="Calopsita">Calopsita</Option>          
          <Option value="Capivara">Capivara</Option>          
          <Option value="Cavalo">Cavalo</Option>
          <Option value="Cobra">Cobra</Option>
          <Option value="Coelho">Coelho</Option>
          <Option value="Coruja">Coruja</Option>
          <Option value="Gado bovino">Gado bovino</Option>
          <Option value="Galinha">Galinha</Option>
          <Option value="Ganso">Ganso</Option>
          <Option value="Gato">Gato</Option>
          <Option value="Hamster">Hamster</Option>
          <Option value="Ovelha">Ovelha</Option>
          <Option value="Pássaro silvestre">Pássaro silvestre</Option>
          <Option value="Papagaio">Papagaio</Option>
          <Option value="Pato">Pato</Option>
          <Option value="Peru">Peru</Option>
          <Option value="Pombo">Pombo</Option>
          <Option value="Rato">Rato</Option>
          <Option value="Tartaruga">Tartaruga</Option>
          <Option value="Outro">Outro</Option>
        </Select>
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

      <Editor
        name={"description"}
        label={"Descrição da denúncia"}
        onChange={() => {return;}}
        isLoading={isLoading}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        upload={false}
      />

      <Form.Item>
        <Button type="default" loading={isLoading} htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}