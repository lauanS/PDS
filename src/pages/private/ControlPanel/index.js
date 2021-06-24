import React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Space, message, Select, Tag } from "antd";

import useReport from "../../../hooks/useReport";

import { statusTranslate } from "../../../utils/statusConverter";

import "./styles.css";
import ModalViewReport from "../../../components/ViewReport/Modal";

const { Search } = Input;

export default function ControlPanel() {
  /* Gerando opções dos filtros */
  const [animals, setAnimals] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({});
  const [modalReportVisible, setModalReportVisible] = useState(false);

  const { reports, isLoadingReports, errorLoadingReport } = useReport();

  const screenSize = { x: window.innerWidth, y: window.innerHeight };

  const showReportModal = (data) => {
    setCurrentReport(data);
    setModalReportVisible(true);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  /* Atualizando lista com filtros */
  const onChangeStatus = (value) => {
    setStatus(value);
  };

  /* Atualizando lista com filtros */
  const onChangeAnimal = (value) => {
    setAnimals(value);
  };

  /* Atualiza as denúncias filtradas com base nos filtros */
  const updateFilteredReports = () => {
    let newFilteredReports = reports;

    /* Primeiro filtra pelo endereço */
    if (search !== "") {
      newFilteredReports = Array.isArray(newFilteredReports)
        ? newFilteredReports.filter(
            (report) =>
              report.address.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        : [];
    }

    /* Filtramos por status */
    if (status.length !== 0) {
      newFilteredReports = newFilteredReports.filter((report) => {
        return status.includes(statusTranslate(report.status));
      });
    }

    /* Filtro por espécie */
    if (animals.length !== 0) {
      newFilteredReports = newFilteredReports.filter((report) => {
        return animals.includes(report.animal);
      });
    }
    setFilteredReports(newFilteredReports);
  };

  /* Filtrando as denúncias com base no status */
  useEffect(() => {
    console.log("Irá filtrar");
    updateFilteredReports();
  }, [status, search, animals]);

  /* Atualizando as denúncias */
  useEffect(() => {
    setFilteredReports(reports);

    let uniqueAnimals = new Set();
    reports.map((report) => {
      return uniqueAnimals.add(report.animal);
    });

    setAllAnimals(Array.from(uniqueAnimals).sort());
  }, [reports]);

  /* Verificando a ocorrência de um erro */
  useEffect(() => {
    if (errorLoadingReport === true) {
      message.error("Erro ao carregar as denúncias");
    }
  }, [errorLoadingReport]);

  /* Criando as tags para exibição do status */
  const tagName = (value) => {
      if (value === 'Aberto')
        return 'green'
      else if (value === 'Processando')
        return 'yellow'
      else if (value === 'Fechado')
        return 'red'
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
      render: (text) => <Tag color={tagName(statusTranslate(text))}>{statusTranslate(text)}</Tag>,
    },
  ];

  return (
    <>
      <div className="table-container">
        <Space
          direction="vertical"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <p className="search-title">Busca por endereço</p>
          <Search
            placeholder="Busca por endereço"
            value={search}
            onChange={updateSearch}
            style={{ width: "100%" }}
          />
          <div className="filters">
            Filtros:
            <Select
              placeholder="Espécie"
              mode="multiple"
              showArrow
              style={{ width: "100%" }}
              autoClearSearchValue
              maxTagCount="responsive"
              onChange={onChangeAnimal}
            >
              {allAnimals.map((animal, key) => {
                return (
                  <Select.Option value={animal} key={key}>
                    {animal}
                  </Select.Option>
                );
              })}
            </Select>
            <Select
              placeholder="Status"
              mode="multiple"
              showArrow
              allowClear
              style={{ width: "100%" }}
              onChange={onChangeStatus}
              maxTagCount='responsive'
            >
              <Select.Option value="Aberto">Aberto</Select.Option>
              <Select.Option value="Processando">Processando</Select.Option>
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
              return {
                onClick: (event) => {
                  showReportModal(record);
                },
              };
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
