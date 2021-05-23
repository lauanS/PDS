import React, { useEffect } from "react";
import { Card, Button, Dropdown, Menu, Modal, message } from "antd";
import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import ViewReport from "../";
import useReport from "../../../hooks/useReport";

export default function CardViewReport(props) {
  const {
    deleteReportById,
    updateReport,
    errorDeleteReport,
    errorUpdateReport,
    setErrorDeleteReport,
    setErrorUpdateReport,
    isLoadingReports,
  } = useReport();

  const { confirm } = Modal;

  const report = props.report;
  const keyToStatus = { 1: "opened", 2: "processing", 3: "closed" };

  const onClickDeleteReport = async (e) => {
    confirm({
      title: "Tem certeza que deseja apagar essa denúncia?",
      icon: <ExclamationCircleOutlined />,
      content: "Após apagar a denúncia, não será possível recuperá-la",
      okText: 'Sim, deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteReportById(report.id);
      },
    });
  };

  const onSelectStatus = async (e) => {
    if (keyToStatus[e.key] === report.status) {
      return;
    } else {
      report.status = keyToStatus[e.key];
      await updateReport(report);
    }
    console.log(report);
  };

  /* Verificando a ocorrência de um erro ao *deletar* */
  useEffect(() => {
    if (errorDeleteReport === true) {
      message.error("Erro ao tentar excluir a denúncia").then(() => {
        setErrorDeleteReport(false);
      });
    }
  }, [errorDeleteReport, setErrorDeleteReport]);

  /* Verificando a ocorrência de um erro ao *atualizar* */
  useEffect(() => {
    if (errorUpdateReport === true) {
      message.error("Erro ao tentar alterar o status da denúncia").then(() => {
        setErrorUpdateReport(false);
      });
    }
  }, [errorUpdateReport, setErrorUpdateReport]);

  const menu = (
    <Menu onClick={onSelectStatus}>
      <Menu.Item key="1" icon={<FrownOutlined />}>
        Aberto
      </Menu.Item>
      <Menu.Item key="2" icon={<MehOutlined />}>
        Processando
      </Menu.Item>
      <Menu.Item key="3" icon={<SmileOutlined />}>
        Fechado
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title="Denúncia"
      bordered={false}
      loading={isLoadingReports}
      actions={[
        <Button type="primary" onClick={onClickDeleteReport}>
          Excluir
        </Button>,
        <>
          <Dropdown overlay={menu}>
            <Button>
              Alterar Status <DownOutlined />
            </Button>
          </Dropdown>
        </>,
      ]}
    >
      <ViewReport key="1" report={report} />
    </Card>
  );
}
