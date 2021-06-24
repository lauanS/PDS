import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { Button, Collapse, Form, message } from "antd";

import CardViewReport from "../../components/ViewReport/Card";
import Editor from "../../components/Editor";
import CommentList from "./CommentList";

import useComment from "../../hooks/useComment";
import { Context } from "../../context/authContext";
import "./styles.css";

export default function ViewReportPage() {
  const {
    reportComments,
    loadReportComments,
    isLoadingComments,
    errorCreateComment,
    setErrorCreateComment,
    errorLoadingComment,
    setErrorLoadingComment,
    updateCommentList,
  } = useComment();

  const { getUser, isAdmin } = useContext(Context);
  const userName = getUser();

  const [form] = Form.useForm();
  const [ , setNewCommentText] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);

  const location = useLocation();
  const report = location.state.report;

  const { Panel } = Collapse;

  const submitComment = async (e) => {
    const newComment = {
      reportId: report.id,
      comment: e.description,
      author: userName,
    };
    const fileList = attachedFiles.slice();
    await updateCommentList(newComment, fileList);
    form.resetFields();
    setAttachedFiles([]);
    message.success("Comentário enviado");
  };

  const handleChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const havePermission = (author) => {
    return (userName === author) || isAdmin();
  }

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
          <CardViewReport report={report} loadReportComments={loadReportComments}/>
          {havePermission(report.author) &&
            <Collapse defaultActiveKey={["1"]} ghost>
              <Panel key="1" header={"Adicionar um comentário"}>
                <Form onFinish={submitComment} form={form}>
                  <Editor
                    report={report}
                    name={"description"}
                    onChange={handleChange}
                    isLoading={isLoadingComments}
                    attachedFiles={attachedFiles}
                    setAttachedFiles={setAttachedFiles}
                    upload={true}
                  />
                  <Button
                    htmlType="submit"
                    loading={isLoadingComments}
                    type="primary"
                    style={{ display: "block", width: "100%" }}
                  >
                    Enviar
                  </Button>
                </Form>
              </Panel>
            </Collapse>
          }
          <CommentList
            reportComments={reportComments}
            loadReportComments={loadReportComments}
            isLoadingComments={isLoadingComments}
            errorLoadingComment={errorLoadingComment}
            setErrorLoadingComment={setErrorLoadingComment}
          />
        </>
      ) : (
        <h1>Nenhuma denúncia selecionada</h1>
      )}
    </>
  );
}
