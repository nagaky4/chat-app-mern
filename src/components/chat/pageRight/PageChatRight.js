import React, { Component } from "react";
import "./PageChatRight.scss"

export class PageChatRight extends Component {
  render() {
    return (
      <div className="page-right">
        <div className="chat-partner">Nanako</div>
        <div className="row">
          <div className="p-body col-sm-12">
            <div className="p-chat-item-left">
              <div className="img-item">
                <img src="/img/user1.jpg" alt="" />
              </div>
              <p className="p-chat-text">Hello how are you today</p>
              <div className="per-name">Lisa</div>
            </div>

            <div className="p-chat-item-right">
              <div className="img-item">
                <img src="/img/user2.jpg" alt="" />
              </div>
              <p className="p-chat-text">i'm ok thanks</p>
              <div className="per-name">nanako</div>
            </div>

            <div className="p-chat-item-left">
              <div className="img-item">
                <img src="/img/user1.jpg" alt="" />
              </div>
              <p className="p-chat-text">Have a nice day nanako</p>
              <div className="per-name">Lisa</div>
            </div>

            <div className="p-chat-item-right">
              <div className="img-item">
                <img src="/img/user2.jpg" alt="" />
              </div>
              <p className="p-chat-text">You too !</p>
              <div className="per-name">nanako</div>
            </div>
          </div>

          <div className="p-footer col-sm-12">
            <div className="form-group">
              <textarea className="form-control" name="" rows="1"></textarea>
            </div>
            <div className="fo-send">
              <i className="far fa-smile"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageChatRight;
