import React from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "antd";

import ViewReport from "../";

export default function ModalViewReport(props) {
  const { modalVisible, setModalVisible } = props;
  const report = props.report;
  const history = useHistory();

  const OnClickOpenCase = () => {
    setModalVisible(false);
    history.push({
      pathname: '/view',
      state: { report: report }
    });
  };

  const hideModal = () => {
    setModalVisible(false);
  }
  return (
    <Modal
      title="Denúncia"
      visible={modalVisible}
      footer={[
        <Button type="primary" onClick={OnClickOpenCase}>
          Abrir caso
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <ViewReport report={report} />
    </Modal>
  );
}
