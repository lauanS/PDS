import React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Space, message, Select } from "antd";

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
    console.log("Chamou setFilteredReports");
    setFilteredReports(reports);
  }, [reports]);

  /* Verificando a ocorrência de um erro */
  useEffect(() => {
    if(errorLoadingReport === true){
      message.error("Erro ao carregar as denúncias");
    }    
  }, [errorLoadingReport]);


  /* Gerando opções dos filtros */
  const [animalFilter = {name, value}, setAnimalFilter] = useState([]);
  const [statusFilter = {name, value}, setStatusFilter] = useState([]);

  const createAnimalFilter = (reports) => {
    const filter = new Set(reports.animal);
    setAnimalFilter(filter);
  }
  
  const createStatusFilter = (record) => {
    console.log("Record " + record);
    setStatusFilter(record);
    return statusFilter;
  }
  
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
          <div className="filters">
            Filtros:
            <Select placeholder="Espécie" mode="multiple" showArrow style={{width: '100%'}}>
                <Select.Option value="Cão">Cão</Select.Option>
                <Select.Option value="Gato">Gato</Select.Option>
                <Select.Option value="Cacatua">Cacatua</Select.Option>
            </Select>
            <Select placeholder="Status" mode="multiple" showArrow style={{width: '100%'}}>
                <Select.Option value="Aberto">Aberto</Select.Option>
                <Select.Option value="Em andamento">Em andamento</Select.Option>
                <Select.Option value="Fechado">Fechado</Select.Option>
            </Select>
          </div>
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
