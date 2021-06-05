import React, { useState } from "react";
import { Form, Input, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "./styles.css";

export default function Editor(props) {
  const { onChange, name, isLoading } = props;
  const { TextArea } = Input;
  const { fileList, setFileList } = useState([]);

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  return (
    <>
      <Form.Item
        name={name}
        rules={[
          { 
            required: true, 
            message: "Por favor, insira uma descrição" },
          {
            min: 2,
            message: "Descrição muito curta",
          },
        ]}
      >
        <TextArea
          rows={4}
          onChange={onChange}
          disabled={isLoading}
        />
      </Form.Item>
      <Form.Item label="Adicionar Anexos">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} >
          <Upload.Dragger name="files" listType="picture-card">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique ou arraste o arquivo nesta área para envia-los</p>
            <p className="ant-upload-hint">Suporta o envio de um ou mais arquivos</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </>
  );
}
