import React from "react";
import "../styles/Chat.css";

const Chat = ({ children }) => {
  return (
    <div className="chat">
      {children}
    </div>
  );
};

export default Chat;
