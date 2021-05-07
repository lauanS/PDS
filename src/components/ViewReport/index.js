import React from "react";

export default function ViewReport(props) {
  const report = props.report

  return (
    <>
    <p>{report.address}</p>
    <p>
      Raça/Espécie: {report.animal}
      {report.breeds && " | " + report.breeds}
    </p>
    <p>Situação: {report.status} </p>
    <p>Descrição: </p>
    <p>{report.description}</p>
    </>
  );
}
