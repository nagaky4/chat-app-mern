import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.scss";
import Spiner from "../../shared/spiner/Spiner";

import * as userActions from "../../actions/user";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
export class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.token.email);
  }

  uploadSuccess = () => {
    this.props.fetchUser(this.props.token.email);
  };

  uploadErr = () => {
    console.log("upload err");
  };

  render() {
    const { loading, user, token } = this.props;
    return (
      <div className="profile-page">
        {(!loading && !user) || loading ? (
          <Spiner width="50px" height="50px" background="black" />
        ) : (
          <>
            <ProfileLeft
              user={user}
              token={token}
              onSuccess={this.uploadSuccess}
              onError={this.uploadErr}
            />
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
    loading: state.userReducer.loading
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
