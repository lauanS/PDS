import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router";

import { Avatar, Comment, List, Tooltip, Alert, message } from "antd";
import FileItem from "../../../components/FileItem";

import { parseISO, format, formatRelative } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { statusCharToComment } from "../../../utils/statusConverter";

import adminAvatar from "../../../assets/admin1.png";
import userAvatar from "../../../assets/user.png";

import "./styles.css";

export default function CommentList(props) {
  const location = useLocation();
  const report = location.state.report;

  const {
    reportComments,
    loadReportComments,
    isLoadingComments,
    errorLoadingComment,
    setErrorLoadingComment,
  } = props;

  const loadComments = useCallback(async () => {
    loadReportComments(report.id);
  }, [report, loadReportComments]);

  /* Carregando os comentários */
  useEffect(() => {
    loadComments();
  }, [loadComments, loadReportComments]);

  /* Verificando a ocorrência de um erro ao carregar informações de um comentário */
  useEffect(() => {
    if (errorLoadingComment === true) {
      message.error("Erro ao carregar os comentários da denúncia").then(() => {
        setErrorLoadingComment(false);
      });
    }
  }, [errorLoadingComment, setErrorLoadingComment]);

  const processToType = {
    A: "warning",
    F: "success",
    P: "info",
    "Caso aberto": "warning",
  };

  return (
    <List
      className="comment-list"
      dataSource={reportComments}
      loading={isLoadingComments}
      header={<span className="comment-list-header">Atualizações:</span>}
      itemLayout="horizontal"
      renderItem={(comment) => (
        <Comment
          className="comment-item"
          author={<p>{comment.author}</p>}
          content={
            comment.comment === 'O'?
            <FileItem file={comment} />
            :
            comment.comment.length === 1 ||
            comment.comment === "Caso aberto" ? (
              <>
                <Alert
                  message={statusCharToComment(comment.comment)}
                  type={processToType[comment.comment]}
                  showIcon
                />
              </>
            ) : (
              <p>{comment.comment}</p>
            )
          }
          datetime={
            <Tooltip
              title={format(
                parseISO(comment.date),
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR }
              )}
            >
              <span>
                {formatRelative(parseISO(comment.date), new Date(), {
                  locale: ptBR,
                })}
              </span>
            </Tooltip>
          }
          avatar={
            comment.author !== "SalvaCão" ? (
              <Avatar
                src={userAvatar}
                alt="Ícone do administrador"
                style={{ cursor: "default" }}
              />
            ) : (
              <Avatar src={adminAvatar} alt="Ícone do denúnciante" />
            )
          }
        />
      )}
    />
  );
}
