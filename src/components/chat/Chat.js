import React from "react";
import { connect } from "react-redux";
import "./Chat.scss";
import PageChatLeft from "./pageLeft/PageChatLeft";
import PageChatRight from "./pageRight/PageChatRight";
import * as userActions from "../../actions/user";

class Chat extends React.PureComponent {
  componentDidMount() {
    console.log('refect user');
    const { fetchUser, token } = this.props;
    fetchUser(token.email);
  }

  render() {
    return (
      <div className="chat-page">
        <PageChatLeft />
        <PageChatRight />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.authen.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: email => {
      dispatch(userActions.fecthUser(email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
