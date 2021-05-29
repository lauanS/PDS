import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button, Collapse } from "antd";

import CardViewReport from "../../components/ViewReport/Card";
import Editor from "../../components/Editor";
import CommentList from "./CommentList";

import "./styles.css";
export default function ViewReportPage(props) {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const location = useLocation();
  const report = location.state.report;

  const { Panel } = Collapse;

  const handleSubmit = () => {
    console.log("Comentário enviado");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const toggleOpenEditor = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  return (
    <>
      {report ? (
        <>
          <CardViewReport report={report} />
          <Collapse defaultActiveKey={["1"]} ghost>
            <Panel
              key="1"
              header={
                  "Adicionar um comentário"
              }
            >
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
                type="primary"
              >
                Enviar
              </Button>
            </Panel>
          </Collapse>
          <CommentList />
        </>
      ) : (
        <h1>Nenhuma denúncia selecionada</h1>
      )}
    </>
  );
}
