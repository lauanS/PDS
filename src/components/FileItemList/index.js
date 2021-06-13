import React from "react";
import { Button, Progress, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import FileItem from "../FileItem";

import "./styles.css";

export default function FileItemList(props) {
  // Esse file é o objeto criado durante o uploading de uma imagem
  // Possui campos diferentes como o "progress"
  const { file, removeFile } = props;

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

  const onRemove = () => {
    removeFile(file);
  };
  return (
    <>
      <FileItem file={file}>
        <div className="progress-file-item">
          <Tooltip title="Excluir">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={onRemove}
              style={{ margin: 15 }}
            />
          </Tooltip>
          <Progress
            type="circle"
            percent={file.percent}
            width={35}
            status={fileStatusToProgressStatus(file.status)}
          />
        </div>
      </FileItem>
    </>
  );
}
