import React from "react";

const TabLeft = props => {
  console.log("render left");
  return (
    <div className="pl-friends">
      <div className="one-friend">
        <div className="img-item">
          <img src="/img/user2.jpg" alt="" />
        </div>
        <p className="p-chat-text">Hello how are you today</p>
        <p className="p-chat-time">15:30 pm</p>
        <div className="per-name">Nanako</div>
      </div>
      <div className="one-friend">
        <div className="img-item">
          <img src="/img/user2.jpg" alt="" />
        </div>
        <p className="p-chat-text">Hello how are you today</p>
        <p className="p-chat-time">yesterday</p>
        <div className="per-name">Lisa</div>
      </div>
    </div>
  );
};
export default TabLeft;
