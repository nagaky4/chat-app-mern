import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";

import "./PageChatLeft.scss";

export class PageChatLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "chat-list"
    };
  }
  render() {
    return (
      <div className="page-left">
        <div className="pl-search">
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="search"
          />
        </div>

        <Tabs
          activeKey={this.state.key}
          onSelect={k => this.setState({ key: k })}
          className="pl-tools"
        >
          <Tab
            eventKey="chat-list"
            title={<i className="one-icon fa fa-comment"> </i>}
          >
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
          </Tab>
          <Tab
            eventKey="my-friends"
            title={<i className="one-icon fa fa-users"></i>}
          >
            <div className="pl-friends">
              <div className="one-friend">
                <div className="img-item">
                  <img src="/img/user2.jpg" alt="" />
                </div>
                <p className="p-add-friend">
                  <i className="fa fa-user-plus"></i>
                </p>
                <div className="per-name">Nicky</div>
              </div>
              <div className="one-friend">
                <div className="img-item">
                  <img src="/img/user2.jpg" alt="" />
                </div>
                <p className="p-add-friend">
                  <i className="fa fa-user-plus"></i>
                </p>
                <div className="per-name">Furry</div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default PageChatLeft;
