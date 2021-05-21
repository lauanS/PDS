import React from "react";

import CardViewReport from "../../components/ViewReport/Card";
import "./styles.css";

export default function ViewReportPage() {
  const report = {
    "id": 1,
    "description": "O animal está severamente machucado e seu dono se recussa a procurar ajuda, mesmo após a comunidade de unir para pagar um veterinário para o animal",
    "address": "R. Mituto Mizumoto, 69 - Sé, São Paulo - SP, 01513-040, Brasil",
    "animal": "Gato",
    "breeds": "",
    "status": "processing",
    "isAnonymous": false,
    "lat": "-23.557521150854427",
    "lng": "-46.63197388276037"
  }
  
  return (
    <>
      <CardViewReport report={report}/>
    </>
  );
}
