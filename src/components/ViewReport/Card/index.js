import React, { useEffect } from "react";
import { Card, Button, Dropdown, Menu, message } from "antd";
import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons";

import ViewReport from "../";
import useReport from "../../../hooks/useReport";

export default function CardViewReport(props) {
  const {
    deleteReportById,
    updateReport,
    errorLoadingReport,
    setErrorLoadingReport,
    isLoadingReports,
  } = useReport();

  const report = props.report;
  const keyToStatus = { 1: "opened", 2: "processing", 3: "closed" };

  const onClickDeleteReport = (e) => {
    deleteReportById(report.id);
  };

  const onSelectStatus = async (e) => {
    if (keyToStatus[e.key] === report.status) {
      return;
    } else {
      report.status = keyToStatus[e.key];
      await updateReport(report);
    }
    console.log(report);
    //deleteReportById();
  };

  /* Verificando a ocorrência de um erro */
  useEffect(() => {
    if (errorLoadingReport === true) {
      message.error("Erro ao interagir com as denúncias").then(() => {
        setErrorLoadingReport(false);
      });
    }
  }, [errorLoadingReport]);

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
