import React, { useState } from "react";
import { Form, Input, Upload, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "./styles.css";

export default function Editor(props) {
  const { onChange, name, isLoading } = props;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);

  const [filePreview, setFilePreview] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
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
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            name="files"
            listType="picture-card"
            fileList={fileList}
            onPreview={onPreviewFile}
            onChange={onChangeFileList}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste o arquivo nesta área para envia-los
            </p>
            <p className="ant-upload-hint">
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
