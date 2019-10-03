import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.scss";
import Spiner from "../../shared/spiner/Spiner";

import * as userActions from "../../actions/user";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import NotifyPortal from "../../UI/Notify/NotifyPortal";
export class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.token.email);
  }

  render() {
    const { loading, user, error, success } = this.props;
    return (
      <div className="profile-page">
        {(!loading && !user) || loading ? (
          <Spiner width="50px" height="50px" background="black" />
        ) : (
          <>
            {error && (
              <NotifyPortal
                className="alert alert-warning"
                message={error ? error : "Không thể đổi mật khẩu"}
              />
            )}
            {success && <NotifyPortal message={success} />}
            <ProfileLeft user={user} />
            <ProfileRight user={user} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.authen.token,
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    error: state.userReducer.error,
    success: state.userReducer.success
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
)(Profile);
