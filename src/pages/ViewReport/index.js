import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button, Collapse } from "antd";

import CardViewReport from "../../components/ViewReport/Card";
import Editor from "../../components/Editor";
import CommentList from "./CommentList";

import { postCommentDev } from "../../services";

import "./styles.css";

export default function ViewReportPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const location = useLocation();
  const report = location.state.report;

  const { Panel } = Collapse;

  const submitComment = async () => {
    setIsLoading(true);
    const newComment = {
      reportId: report.id,
      comment: newCommentText,
      author: "João da Silva",
    };

    try {      
      await postCommentDev(newComment);
      setIsLoading(false);
      console.log("Comentário enviado");
    } catch (error) {
      console.log("Erro ao tentar adicionar o novo comentário: ", newComment);
      console.log(error);
      setError(true);
      setIsLoading(false);
    }    
  };

  const handleChange = (e) => {
    setNewCommentText(e.target.value);
  };

  return (
    <>
      {report ? (
        <>
          <CardViewReport report={report} />
          <Collapse defaultActiveKey={["1"]} ghost>
            <Panel key="1" header={"Adicionar um comentário"}>
              <Editor
                onChange={handleChange}
                isLoading={isLoading}
                value={newCommentText}
              />
              <Button
                htmlType="submit"
                loading={isLoading}
                onClick={submitComment}
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
