import { useState, useEffect, useCallback, useRef } from "react";

import { getReports, putReport, deleteReport, postUpdateStatus } from "../services/index";
import { statusCharToString } from "../utils/statusConverter";

export default function useReport() {
  const [reports, setReports] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [errorLoadingReport, setErrorLoadingReport] = useState(false);
  const [errorUpdateReport, setErrorUpdateReport] = useState(false);
  const [errorDeleteReport, setErrorDeleteReport] = useState(false);

  const mounted = useRef(true);

  const loadReports = useCallback(async () => {
    setIsLoadingReports(true);
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
        setIsLoadingReports(false);
      }
    } catch (error) {
      if (mounted.current) {
        console.log(error);
        setIsLoadingReports(false);
        setErrorLoadingReport(true);
      }
    }
    return;
  }, []);

  const deleteReportById = async (id) => {
    setIsLoadingReports(true);
    try {
      await deleteReport(id);

      // Atualiza a nossa lista de reports
      const reportsFiltered = reports.filter((report) => {
        return report.id !== id;
      });
      setReports(reportsFiltered);
      setIsLoadingReports(false);
      
    } catch (error) {
      console.log("Erro ao deletar pelo ID");
      console.log(error);
      setErrorDeleteReport(true);
      setIsLoadingReports(false);
    }
  };

  const updateReport = async (report) => {
    if (!report.id) {
      console.log("Denúncia não possuí ID, não é possívele atualiza-la");
      setErrorUpdateReport(true);
      return;
    }

    setIsLoadingReports(true);
    try {
      await putReport(report, report.id);

      // Atualiza a nossa lista de reports
      const id = report.id;
      const reportsFiltered = reports.filter((reportFilter) => {
        if (reportFilter.id === id) {
          return report;
        } else {
          return reportFilter;
        }
      });
      setReports(reportsFiltered);
      setIsLoadingReports(false);

    } catch (error) {
      console.log("Erro ao tentar realizar put do report", report);
      console.log(error);
      setErrorUpdateReport(true);
      setIsLoadingReports(false);
    }
  };

  const updateStatus = async (obj) => {
    if (!obj.reportId) {
      console.log("Denúncia não possuí ID, não é possívele atualiza-la");
      setErrorUpdateReport(true);
      return reports;
    }

    setIsLoadingReports(true);
    try {
      await postUpdateStatus(obj);

      // Atualiza a nossa lista de reports
      const id = obj.reportId;
      const reportsFiltered = reports.map((reportFilter) => {
        if (reportFilter.id === id) {
          reportFilter.status = statusCharToString(obj.status);
        }
        return reportFilter;     
      });
      setReports(reportsFiltered);
      setIsLoadingReports(false);
      return(reportsFiltered);
    } catch (error) {
      console.log("Erro ao tentar realizar atualizar o status", obj);
      console.log(error);
      setErrorUpdateReport(true);
      setIsLoadingReports(false);
      return reports;
    }
  };

  /* Carregando as denúncias */
  useEffect(() => {
    loadReports();
    return () => {
      mounted.current = false;
    };
  }, [loadReports]);

  return {
    reports,
    isLoadingReports,
    errorLoadingReport,
    setErrorLoadingReport,
    deleteReportById,
    updateReport,
    errorUpdateReport,
    setErrorUpdateReport,
    errorDeleteReport,
    setErrorDeleteReport,
    updateStatus,
  };
}
