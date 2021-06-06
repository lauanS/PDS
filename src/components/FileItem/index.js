import React, { useState } from "react";
import { Progress, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "./styles.css";

export default function FileItem(props) {
  const { file } = props;
  const url =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

  return (
    <>
      <div className="container-file-item">
        <div className="info-file-item">
          <div className="preview-file-item" alt="Imagem enviada" />
          <div className="content-file-item">
            <strong>Super título</strong>
            <span className="span-file-item">Alguma outra info</span>
          </div>
        </div>
        <div className="progress-file-item">
          <Progress type="circle" percent={30} width={24} status="exception"/>
        </div>
      </div>
    </>
  );
}
