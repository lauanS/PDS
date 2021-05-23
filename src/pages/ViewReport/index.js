import React, { useState } from "react";
import { Avatar, Button, Comment, message, Tooltip } from "antd";
import { useLocation } from "react-router";

import CardViewReport from "../../components/ViewReport/Card";
import { getReportCommentsDev } from "../../services";

import moment from 'moment';

import adminAvatar from "../../assets/admin1.png";

import "./styles.css";
export default function ViewReportPage(props) {
  const location = useLocation();
  const report = location.state.report
  
  const [comments, setComments] = useState([]);

  
  const loadComments = async () => {
    try {
      const data = await getReportCommentsDev(report.id);
      setComments(data);
    } catch (error) {
      console.log(error);
      message.error("Erro ao carregar os comentários");      
    }
    return;
  }

  return (
    <>
      {report? 
      <>
      <CardViewReport report={report}/> 
      <Button onClick={loadComments}>Exibir comentários</Button>

      {comments.map((comment, key) => (
          <Comment
            author={<a>Autor da denúncia</a>}
            content={
              <p key={key}>{comment.comment}</p>
            }
            datetime={              
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
            avatar={
              <Avatar
                src={adminAvatar}
                alt="Han Solo"
              />
            }
            />            
          ))}
      </>
      : <h1>Nenhuma denúncia selecionada</h1>}
      
    </>
  );
}
