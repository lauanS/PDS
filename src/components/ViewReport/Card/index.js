import React, { useState } from "react";
import { Card, Button, Dropdown, Menu } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined, DownOutlined } from '@ant-design/icons';

import ViewReport from "../";

export default function CardViewReport(props) {
  const report = props.report;
  const keyToStatus = {1:"opened", 2: "processing", 3:"closed"}

  function handleMenuClick(e) {
    console.log("Alterando o status para:", keyToStatus[e.key]);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FrownOutlined />}>
        Aberto
      </Menu.Item>
      <Menu.Item key="2" icon={<MehOutlined />}>
        Processando
      </Menu.Item>
      <Menu.Item key="3" icon={<SmileOutlined />}>
        Fechado
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Card
      title="Denúncia"
      bordered={false}
      actions={[
        <Button type="primary" onClick={() => {return}}>
          Excluir
        </Button>,
        <>
          <Dropdown overlay={menu}>
            <Button>
              Alterar Status <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ]}
    >
      <ViewReport key="1" report={report} />
    </Card>
  );
}
