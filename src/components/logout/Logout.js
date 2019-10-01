import { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/authen";
export class Logout extends Component {
  componentDidMount() {
    const { history } = this.props;
    this.props.logout();
    history.push("/login");
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      console.log("click mà");
      dispatch(userActions.submitLogout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
