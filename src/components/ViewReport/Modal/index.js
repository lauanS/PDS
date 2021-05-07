import React, { useState } from "react";
import { Modal, Button } from "antd";

import ViewReport from "../";

export default function ModalViewReport(props) {
  const { modalVisible, setModalVisible } = props;

  const hideModal = () => {
    setModalVisible(false);
  };

  const report = props.report;

  return (
    <Modal
      title="Denúncia"
      visible={modalVisible}
      footer={[
        <Button type="primary" onClick={hideModal}>
          OK
        </Button>,
      ]}
    >
      <ViewReport key="1" report={report} />
    </Modal>
  );
}
