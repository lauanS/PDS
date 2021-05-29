import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "antd";

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
          {isEditorOpen ? (
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          ) : (
            <Button
              type="text"
              style={{ display: "block", width: "100%" }}
              onClick={toggleOpenEditor}
            >
              Adicionar um comentário
            </Button>
          )}
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={handleSubmit}
            type="primary"
          >
            Enviar
          </Button>
          <CommentList />
        </>
      ) : (
        <h1>Nenhuma denúncia selecionada</h1>
      )}
    </>
  );
}
