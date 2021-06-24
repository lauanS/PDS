import React from "react";
import { Spin } from "antd";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function Progress(props) {
  const { status, width } = props;
  return (
    
      status === "success" ? (
        <CheckCircleOutlined style={{ fontSize: width }} />
      ) : status === "exception" ? (
        <CloseCircleOutlined style={{ fontSize: width }} />
      ) : (
        <Spin indicator={<LoadingOutlined spin />} style={{ fontSize: width }} />
      )
    
  );
}
