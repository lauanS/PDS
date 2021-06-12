import React, { useState } from "react";
import { Form, Input, Upload, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import FileItemList from "../FileItemList";

import { postFileDev } from "../../services";
import { getBase64 } from "../../utils/base64"

import "./styles.css";

export default function Editor(props) {
  const { onChange, name, isLoading } = props;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const [filePreview, setFilePreview] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const uploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log("meu arquivo: ", file);

    const obj = {
      reportId: 6, // Id da denúncia
      author: "João da Silva", // Nome de quem enviou o arquivo
      name: file.name, // Nome do arquivo (exemplo: img.png)
      fileBase64: await getBase64(file), // Arquivo base64
      size: file.size, // Tamanho do arquivo (em bytes)
      preview: URL.createObjectURL(file), // URL para preview (não precisa salvar)
      url: null // URL no nosso servidor      
    };

    postFileDev(obj)
      .then((res) => {
        onSuccess(file);
        setAttachedFiles([...attachedFiles, res.data])
        console.log("!Sucesso!", res);
      })
      .catch((err) => {
        const error = new Error("!Deu ruim!");
        onError({ event: error });
      });
  };

  const onPreviewFile = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setFilePreview(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setModalVisible(true);
  };

  const onChangeFileList = ({ fileList }) => {
    setFileList({ fileList });
  };

  const toggleModalVisibel = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
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
              return (<FileItemList
                originNode={originNode}
                onPreview={onPreviewFile}
                file={file}
                fileList={currFileList}
              />)
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

      <Modal
        visible={modalVisible}
        title={previewTitle}
        footer={null}
        onCancel={toggleModalVisibel}
      >
        <img alt="imagem enviada" style={{ width: "100%" }} src={filePreview} />
      </Modal>
    </>
  );
}
