import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import * as findUserActions from "../../../actions/findUsers";
import "./PageChatLeft.scss";
import TabRight from "./TabRight";
import TabLeft from "./TabLeft";

export class PageChatLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "chat-list"
    };
  }
  timmer = null;
  onSearchUser = e => {
    const { searchUser } = this.props;
    const value = e.target.value;
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
    if (this.state.key === "my-friends") {
      this.timmer = setTimeout(() => {
        searchUser(value);
      }, 500);
    }
  };

  render() {
    return (
      <div className="page-left">
        <div className="pl-search">
          <input
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="search"
            onChange={this.onSearchUser}
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
            <TabLeft />
          </Tab>
          <Tab
            eventKey="my-friends"
            title={<i className="one-icon fa fa-users"></i>}
          >
            <TabRight />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchUser: value => dispatch(findUserActions.searchUser(value))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PageChatLeft);
