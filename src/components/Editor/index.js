import React from "react";
import { Button, Form, Input } from "antd";

import "./styles.css";

export default function Editor(props) {
  const { onChange, onSubmit, submitting, value } = props;
  const { TextArea } = Input;

  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
    </>
  );
}
