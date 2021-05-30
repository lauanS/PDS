import React from "react";
import { Form, Input } from "antd";

import "./styles.css";

export default function Editor(props) {
  const { onChange, name, isLoading } = props;
  const { TextArea } = Input;

  return (
    <>
      <Form.Item
        name={name}
        rules={[
          { 
            required: true, 
            message: "Por favor, insira uma descrição" },
          {
            min: 2,
            message: "Descrição muito curta",
          },
        ]}
      >
        <TextArea
          rows={4}
          onChange={onChange}
          disabled={isLoading}
        />
      </Form.Item>
    </>
  );
}
