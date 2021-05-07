import { message } from "antd";

export const errorMsg = (msg) => {
  message.error(msg);
}

export const successMsg = (msg) => {
  message.success(msg);
}