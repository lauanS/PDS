import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import FileItem from "../FileItem";
import Progress from "../../components/Progress"
import "./styles.css";

export default function FileItemList(props) {
  // Esse file é o objeto criado durante o uploading de uma imagem
  // Possui campos diferentes como o "progress"
  const { file, removeFile } = props;
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileStatusToProgressStatus = (status) => {
    if (status === "error") {
      return "exception";
    }
    if (status === "removed") {
      return "exception";
    }
    if (status === "success") {
      return status;
    }
    if (status === "done") {
      return "success";
    }
    if (status === "uploading") {
      return "normal";
    }
  };

  const onRemove = async () => {
    setIsLoading(true);
    await removeFile(file);
    setIsLoading(false);
  };

  /* Atualiza o valor de uploadComplete ao terminar de enviar o arquivo */
  useEffect(() => {
    if (file.status === "done" || file.status === "success") {
      setUploadComplete(true);
    }
  }, [file.status]);
  return (
    <>
      <FileItem file={file}>
        <div className="progress-file-item">
          {uploadComplete && (
            <Tooltip title="Excluir">
              <Button
                loading={isLoading}
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={onRemove}
                style={{ margin: 15 }}
              />
            </Tooltip>
          )}
          <Progress
            width={20}
            status={fileStatusToProgressStatus(file.status)}
          />
        </div>
      </FileItem>
    </>
  );
}
