import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Comment, List, Tooltip, message } from "antd";
import { useLocation } from "react-router";

import { getReportCommentsDev } from "../../../services";

import { parseISO, format, formatRelative } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import adminAvatar from "../../../assets/admin1.png";
import userAvatar from "../../../assets/user.png";

import "./styles.css";

export default function CommentList(props) {
  const location = useLocation();
  const report = location.state.report;

  const [comments, setComments] = useState([]);

  const loadComments = useCallback(async () => {
    try {
      const data = await getReportCommentsDev(report.id);

      setComments(data);
    } catch (error) {
      console.log(error);
      message.error("Erro ao carregar os comentários");
    }
    return;
  }, []);

  /* Carregando os comentários */
  useEffect(() => {
    loadComments();
    console.log("load c");
  }, [loadComments, setComments]);

  return (
    <List
      dataSource={comments}
      header="Atualizações:"
      itemLayout="horizontal"
      renderItem={(comment) => (
        <Comment
          author={<p>{comment.author}</p>}
          content={<p>{comment.comment}</p>}
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
              <Avatar src={adminAvatar} alt="Ícone do administrador" />
            ) : (
              <Avatar src={userAvatar} alt="Ícone do denúnciante" />
            )
          }
        />
      )}
    />
  );
}
