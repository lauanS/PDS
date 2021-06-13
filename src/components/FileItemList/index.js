import React from "react";
import { Progress } from "antd";

import FileItem from "../FileItem";

import "./styles.css";

export default function FileItemList(props) {
  // Esse file é o objeto criado durante o uploading de uma imagem
  // Possui campos diferentes como o "progress"
  const { file } = props;

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
  
  return (
    <>
      <FileItem file={file}>
        <div className="progress-file-item">
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
