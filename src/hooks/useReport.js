import { useState, useEffect, useCallback, useRef } from "react";

import { getReports, putReport } from "../services/index";

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

  /* Carregando as denúncias */
  useEffect(() => {
    loadReports();
    return () => {
      mounted.current = false;
    };
  }, [loadReports]);

  return { reports, isLoadingReports, errorLoadingReport };
}
