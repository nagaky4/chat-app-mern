import { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
export class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    this.props.history.replace("/login");
  }

  render() {
    return null;
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      dispatch(userActions.submitLogout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
