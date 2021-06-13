import React, { useState } from "react";
import { Form, Input, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import FileItemList from "../FileItemList";

import { postFileDev } from "../../services";
import { getBase64 } from "../../utils/base64";

import "./styles.css";

export default function Editor(props) {
  const { onChange, name, isLoading } = props;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const uploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const obj = {
      reportId: 6, // Id da denúncia
      author: "João da Silva", // Nome de quem enviou o arquivo
      name: file.name, // Nome do arquivo (exemplo: img.png)
      fileBase64: await getBase64(file), // Arquivo base64
      size: file.size, // Tamanho do arquivo (em bytes)
      url: null, // URL no nosso servidor
    };

    postFileDev(obj)
      .then((res) => {
        onSuccess(file);
        setAttachedFiles([...attachedFiles, res.data]);
      })
      .catch((_) => {
        const error = new Error("Erro ao realizar o upload do arquivo");
        onError({ event: error });
      });
  };

  const onChangeFileList = ({ fileList }) => {
    setFileList({ fileList });
  };

  return (
    <>
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: "Por favor, insira uma descrição",
          },
          {
            min: 2,
            message: "Descrição muito curta",
          },
        ]}
      >
        <TextArea rows={4} onChange={onChange} disabled={isLoading} />
      </Form.Item>

      <Form.Item label="Adicionar Anexos">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueProps={() => fileList}
        >
          <Upload.Dragger
            name="files"
            listType="picture"
            accept="video/*,image/*"
            fileList={fileList}
            customRequest={uploadFile}
            onChange={onChangeFileList}
            itemRender={(originNode, file, currFileList) => {
              return (
                <FileItemList
                  originNode={originNode}
                  file={file}
                  fileList={currFileList}
                />
              );
            }}
          >
            <p className="ant-upload-drag-icon p-drag">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text p-drag">
              Clique ou arraste o arquivo nesta área para envia-los
            </p>
            <p className="ant-upload-hint p-drag">
              Suporta o envio de um ou mais arquivos
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </>
  );
}
