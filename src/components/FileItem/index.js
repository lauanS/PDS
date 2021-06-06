import React from "react";
import { Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import prettyBytes from "pretty-bytes";
import "./styles.css";

export default function FileItem(props) {
  const { file } = props;
  const url =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

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
      <div className="container-file-item">
        <div className="info-file-item">
          <div
            className="preview-file-item"
            alt="Imagem enviada"
            style={{ backgroundImage: `url(${file.thumbUrl})`}}
          />
          <div className="content-file-item">
            <strong style={{ fontSize: "0.875rem" }}>{file.name}</strong>
            <span className="span-file-item">{prettyBytes(file.size)}</span>
          </div>
        </div>
        <div className="progress-file-item">
          <Progress
            type="circle"
            percent={file.percent}
            width={35}
            status={fileStatusToProgressStatus(file.status)}
          />
        </div>
      </div>
    </>
  );
}
