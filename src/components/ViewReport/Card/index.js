import React, { useEffect, useContext } from "react";
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

import { Context } from "../../../context/authContext";
import { statusStringToChar } from "../../../utils/statusConverter";
import { useHistory } from "react-router";

export default function CardViewReport(props) {
  const {
    deleteReportById,
    updateStatus,
    errorDeleteReport,
    errorUpdateReport,
    setErrorDeleteReport,
    setErrorUpdateReport,
    isLoadingReports,
  } = useReport();

  const { isAuthenticated, isAdmin, getUser } = useContext(Context);

  const { confirm } = Modal;
  const userName = getUser();

  const {report, loadReportComments} = props;
  const keyToStatus = { 1: "opened", 2: "processing", 3: "closed" };
  let history = useHistory();

  const onClickDeleteReport = async (e) => {
    confirm({
      title: "Tem certeza que deseja apagar essa denúncia?",
      icon: <ExclamationCircleOutlined />,
      content: "Após apagar a denúncia, não será possível recuperá-la",
      okText: 'Sim, deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        const deleteReport = async () => {
          await deleteReportById(report.id);
          history.push("/");
        }
        deleteReport();
        
      },
    });
  };

  const onSelectStatus = async (e) => {
    if (keyToStatus[e.key] === report.status) {
      return;
    } else {
      report.status = keyToStatus[e.key];
      const obj = {
        author: userName,
        reportId: report.id,
        status: statusStringToChar(keyToStatus[e.key])
      }
      await updateStatus(obj);
      await loadReportComments(report.id);
    }
    console.log("Report pag: ", report);
  };

  const havePermission = (author) => {
    return (userName === author) || isAdmin();
  }

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
      {isAuthenticated() && isAdmin() && (
        <Menu.Item key="2" icon={<MehOutlined />}>
          Processando
        </Menu.Item>
      )}
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
      actions={havePermission(report.author) && ([isAuthenticated() && isAdmin() && (
        <Button type="primary" onClick={onClickDeleteReport}>
          Excluir
        </Button>
        ),
        <>
          <Dropdown overlay={menu}>
            <Button>
              Alterar Status <DownOutlined />
            </Button>
          </Dropdown>
        </>,
      ])}
    >
      <ViewReport key="1" report={report} />
    </Card>
  );
}
