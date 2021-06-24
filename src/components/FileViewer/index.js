import React from "react";
import { Modal } from "antd";
import useFileViewer from "./hooks/useFileViewer";
import "./styles.css";
import { getFileType } from "../../utils/base64";
import VideoPlayer from "../VideoPlayer";

const FileViewer = (props) => {
  const { fileViewerTitle, fileViewerVisible, toggleFileViewerVisible } = props;

  const { filePreview } = props;
  const type = getFileType(filePreview);
  
  return (
    <>
      <Modal
        visible={fileViewerVisible}
        title={fileViewerTitle}
        footer={null}
        onCancel={toggleFileViewerVisible}
      >
        {type === "img" ? (
          <img alt="imagem enviada" style={{ width: "100%" }} src={filePreview} />
        ) : (
          <VideoPlayer src={filePreview}/>
        )}
      </Modal>
    </>
  );
};

export default FileViewer;
export { useFileViewer };
