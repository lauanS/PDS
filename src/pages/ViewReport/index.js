import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Button, Collapse, message } from "antd";

import CardViewReport from "../../components/ViewReport/Card";
import Editor from "../../components/Editor";
import CommentList from "./CommentList";

import useComment from "../../hooks/useComment";

import "./styles.css";

export default function ViewReportPage() {
  const {
    reportComments,
    loadReportComments,
    isLoadingComments,
    createComment,
    errorCreateComment,
    setErrorCreateComment,
    errorLoadingComment,
    setErrorLoadingComment,
  } = useComment();

  const [newCommentText, setNewCommentText] = useState("");

  const location = useLocation();
  const report = location.state.report;

  const { Panel } = Collapse;

  const submitComment = async () => {
    const newComment = {
      reportId: report.id,
      comment: newCommentText,
      author: "João da Silva",
    };
    createComment(newComment);
  };

  const handleChange = (e) => {
    setNewCommentText(e.target.value);
  };

  /* Verificando a ocorrência de um erro ao criar um comentário*/
  useEffect(() => {
    if (errorCreateComment === true) {
      message.error("Erro ao tentar realizar o comentário").then(() => {
        setErrorCreateComment(false);
      });
    }
  }, [errorCreateComment, setErrorCreateComment]);

  /* Verificando a ocorrência de um erro ao carregar informações de um comentário */
  useEffect(() => {
    if (errorLoadingComment === true) {
      message.error("Erro ao carregar os comentários da denúncia").then(() => {
        setErrorLoadingComment(false);
      });
    }
  }, [errorLoadingComment, setErrorLoadingComment]);

  return (
    <>
      {report ? (
        <>
          <CardViewReport report={report} />
          <Collapse defaultActiveKey={["1"]} ghost>
            <Panel key="1" header={"Adicionar um comentário"}>
              <Editor
                onChange={handleChange}
                isLoading={isLoadingComments}
                value={newCommentText}
              />
              <Button
                htmlType="submit"
                loading={isLoadingComments}
                onClick={submitComment}
                type="primary"
              >
                Enviar
              </Button>
            </Panel>
          </Collapse>
          <CommentList
            reportComments={reportComments}
            loadReportComments={loadReportComments}
            isLoadingComments={isLoadingComments}
            errorLoadingComment={errorLoadingComment}
            setErrorLoadingComment={errorLoadingComment}
          />
        </>
      ) : (
        <h1>Nenhuma denúncia selecionada</h1>
      )}
    </>
  );
}
