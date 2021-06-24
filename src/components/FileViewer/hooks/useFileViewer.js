import { useState } from "react";

export default function useFileViewer() {
  const [fileViewerTitle, setFileViewerTitle] = useState("");
  const [fileViewerVisible, setFileViewerVisible] = useState(false);

  const toggleFileViewerVisible = () => {
    if (fileViewerVisible) {
      setFileViewerVisible(false);
    } else {
      setFileViewerVisible(true);
    }
  };
  return {
    fileViewerTitle,
    setFileViewerTitle,
    fileViewerVisible,
    setFileViewerVisible,
    toggleFileViewerVisible
  };
}
