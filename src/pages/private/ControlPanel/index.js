import React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Space, message } from "antd";

import useReport from "../../../hooks/useReport";

import { statusTranslate } from "../../../utils/statusConverter";

import "./styles.css";
import ModalViewReport from "../../../components/ViewReport/Modal";

const { Search } = Input;

export default function ControlPanel() {
  const {
    reports, isLoadingReports, errorLoadingReport
  } = useReport();

  const [filteredReports, setFilteredReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({});
  const [modalReportVisible, setModalReportVisible] = useState(false);

  const screenSize = { x: window.innerWidth, y: window.innerHeight };


  const onSearch = (value) => {
    searchReports(reports, value);
  };

  const showReportModal = (data) => {
    setCurrentReport(data)
    setModalReportVisible(true);
  };

  const updateSearch = (e) => {
    setFilteredReports(searchReports(reports, e.target.value) || []);
  };

  const searchReports = (list, search) => {
    if (search === "") {
      return list;
    }

    return Array.isArray(list)
      ? list.filter(
          (report) =>
            report.address.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      : [];
  };

  /* Atualizando as denúncias */
  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  /* Verificando a ocorrência de um erro */
  useEffect(() => {
    if(errorLoadingReport === true){
      message.error("Erro ao carregar as denúncias");
    }    
  }, [errorLoadingReport]);

  /* Colunas da lista */
  const columns = [
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Espécie",
      dataIndex: "animal",
      key: "animal",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <p>{statusTranslate(text)}</p>
    },
  ];

  return (
    <>
      <div className="table-container">
        <Space direction="vertical" style={{maxWidth: "100%", maxHeight: "100%"}}>
          <p className="search-title">Busca por endereço</p>          
          <Search
            placeholder="Busca por endereço"
            allowClear
            onChange={updateSearch}
            onSearch={onSearch}
            style={{ width: "100%" }}
          />
          <Table
            columns={columns}
            dataSource={!isLoadingReports ? filteredReports : null}
            loading={isLoadingReports}
            pagination={{ pageSize: Math.floor(screenSize.y / 63) }} // Qtd de itens por pag
            scroll={{ y: screenSize.y - 280 }} // Tamanho máximo da tabela
            bordered
            tableLayout="auto"
            className="table-reports"
            onRow={(record, rowIndex) => {
              return { onClick: event => { showReportModal(record) }}
            }}
          />
        </Space>
      </div>
      <ModalViewReport
        report={currentReport}
        modalVisible={modalReportVisible}
        setModalVisible={setModalReportVisible}
      />
    </>
  );
}
