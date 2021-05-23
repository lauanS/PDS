import React from "react";
import { useLocation } from "react-router";

import CardViewReport from "../../components/ViewReport/Card";
import "./styles.css";

export default function ViewReportPage(props) {
  const location = useLocation();
  const report = location.state.report
  
  return (
    <>
      {report? <CardViewReport report={report}/> : <h1>Nenhuma denúncia selecionada</h1>}
      
    </>
  );
}
