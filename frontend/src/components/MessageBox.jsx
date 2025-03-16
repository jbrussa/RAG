import React from "react";
import "../styles/MessageBox.css";

const MessageBox = ({ children, classname }) => {
  return <div className={`message-box ${classname}`}>{children}</div>;
};

export default MessageBox;
