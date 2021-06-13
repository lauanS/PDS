import React from "react";
import { Modal } from "antd";
import useFileViewer from "./hooks/useFileViewer";
import "./styles.css";

const FileViewer = (props) => {
  const {
    fileViewerTitle,
    fileViewerVisible,
    toggleFileViewerVisible
  } = props;

  const { filePreview } = props;

  return (
    <>
      <Modal
        visible={fileViewerVisible}
        title={fileViewerTitle}
        footer={null}
        onCancel={toggleFileViewerVisible}
      >
        <img alt="imagem enviada" style={{ width: "100%" }} src={filePreview} />
      </Modal>
    </>
  );
}

export default FileViewer; 
export { useFileViewer };
