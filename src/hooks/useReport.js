import { useState, useEffect, useCallback, useRef } from "react";

import { getReports, putReport, deleteReport } from "../services/index";

export default function useReport() {
  const [reports, setReports] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [errorLoadingReport, setErrorLoadingReport] = useState(false);

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
      setErrorLoadingReport(true);
      setIsLoadingReports(false);
    }
  };

  const updateReport = async (report) => {
    if (!report.id) {
      console.log("Denúncia não possuí ID, não é possívele atualiza-la");
      setErrorLoadingReport(true);
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
      setErrorLoadingReport(true);
      setIsLoadingReports(false);
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
  };
}
