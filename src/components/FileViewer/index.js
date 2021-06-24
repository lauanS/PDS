import React from "react";
import { Modal } from "antd";
import useFileViewer from "./hooks/useFileViewer";
import "./styles.css";
import { fileType } from "../../utils/base64";
import VideoPlayer from "../VideoPlayer";

const FileViewer = (props) => {
  const { fileViewerTitle, fileViewerVisible, toggleFileViewerVisible } = props;

  const { filePreview } = props;
  const type = fileType(filePreview);
  
  return (
    <>
      <Modal
        visible={fileViewerVisible}
        title={fileViewerTitle}
        footer={null}
        onCancel={toggleFileViewerVisible}
      >
        {type.indexOf("data:image") !== -1 ? (
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
