import React, { useState } from "react";
import { Card, Button } from "antd";

import ViewReport from "../";

export default function CardViewReport(props) {


  const report = props.report;
  return (
    <Card
      title="Denúncia"
      bordered={false}
      actions={[
        <Button type="primary" onClick={() => {return}}>
          OK
        </Button>,
      ]}
    >
      <ViewReport key="1" report={report} />
    </Card>
  );
}
