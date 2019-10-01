import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class WithAuth extends Component {
  componentDidMount() {
    if (this.props.isAuthen) {
      this.setState({ isLogin: true, loaded: true });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.props.isAuthen) {
      return this.props.children;
    } else return null;
  }
}

const mapStateToProps = state => {
  return {
    isAuthen: state.authen.isLogin
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(WithAuth);
