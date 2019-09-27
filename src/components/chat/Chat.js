import React from "react";
import "./Chat.scss";
import PageChatLeft from "./pageLeft/PageChatLeft";
import PageChatRight from "./pageRight/PageChatRight";
class Chat extends React.PureComponent {
  render() {
    return (
      <div className="chat-page">
        <PageChatLeft />
        <PageChatRight />
      </div>
    );
  }
}

export default Chat;
