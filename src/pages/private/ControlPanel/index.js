import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Input, Space, message } from "antd";
import { Link } from "react-router-dom";

import { getReports } from "../../../services/index";

import { statusTranslate } from "../../../utils/statusConverter";

import "./styles.css";
import ModalViewReport from "../../../components/ViewReport/Modal";

const { Search } = Input;

export default function ControlPanel() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({});
  const [modalReportVisible, setModalReportVisible] = useState(false);

  const [  , setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);

  const screenSize = { x: window.innerWidth, y: window.innerHeight };

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getReports();
      if (mounted.current) {
        let temp = [];
        data.map((report, key) => {
          report.key = key;
          temp.push(report);
          return key;
        });
        setReports(temp);
        setFilteredReports(temp);
        setIsLoading(false);
      }
    } catch (error) {
      if (mounted.current) {
        console.log(error);
        setIsLoading(false);
        setErrors(true);
        message.error("Erro ao carregar as denúncias");
      }
    }
    return;
  }, []);

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

  /* Carregando as denúncias */
  useEffect(() => {
    loadReports();
    return () => {
      mounted.current = false;
    };
  }, [loadReports]);

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
            dataSource={!isLoading ? filteredReports : null}
            loading={isLoading}
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
