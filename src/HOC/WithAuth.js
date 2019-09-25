import { Component } from "react";
import AuthHelperMethods from "../helpers/AuthHelperMethods";
import { withRouter } from "react-router-dom";

const Auth = new AuthHelperMethods();
class WithAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      loaded: false
    };
  }
  componentDidMount() {
    if (Auth.loggedIn()) {
      this.setState({ isLogin: true, loaded: true });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.state.isLogin) {
      return this.props.children;
    } else return null;
  }
}
export default withRouter(WithAuth);
