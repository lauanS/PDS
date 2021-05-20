import React from "react";

import ViewReport from "../../components/ViewReport";
import "./styles.css";

export default function ViewReportPage() {
  const report = {
    "id": 1619638409706,
    "lat": -23.5535,
    "lng": -46.64756,
    "date": "XX",
    "address": "Avenida Nova Denúncia, 37, São Paulo, SP",
    "animal": "Cacatua",
    "breeds": "",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ligula accumsan leo efficitur finibus. Donec quis nisl condimentum, mattis purus id, dictum urna.",
    "status": "closed"
  }
  return (
    <>
      <ViewReport report={report}/>
    </>
  );
}
