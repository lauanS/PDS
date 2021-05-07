import React, { useState } from "react";
import { Modal } from "antd";

import ViewReport from "../";

export const showModal = () => {

}

export default function ModalViewReport(props) {
  const [modalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
  };

  const report = props.report;

  return (
    <Modal title="Denúncia" visible={modalVisible} onCancel={hideModal}>
      <ViewReport             
        report={{
          "id": 1619662846619,
          "lat": -23.5546544984853,
          "lng": -46.632529824545294,
          "date": "X",
          "animal": "Gato",
          "address": "R. Santa Luzia, 51 - Sé, São Paulo - SP, 01513-030, Brasil",
          "description": "O animal está severamente machucado e seu dono se recussa a procurar ajuda, mesmo após a comunidade de unir para pagar um veterinário para o animal",
          "status": "opened",
          "isAnonymous": true
        }}
      />
    </Modal>
  );
}
