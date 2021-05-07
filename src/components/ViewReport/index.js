import React from "react";

import './style.css';

import { statusTranslate } from '../../utils/statusConverter';

export default function ViewReport(props) {
  const report = props.report

  return (
    <>
      <h4>Endereço</h4>
      <hr></hr>
      <p>{report.address}</p>
      <h4>Espécie/Raça</h4>
      <hr></hr>
       <p> {report.animal}
        {report.breeds && " | " + report.breeds}
      </p>
      <h4>Situação</h4>
      <hr></hr>
      <p>{statusTranslate(report.status)} </p>
      <h4>Descrição: </h4>
      <hr></hr>
      <p>{report.description}</p>
    </>
  );
}
