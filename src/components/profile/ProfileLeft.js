import React, { Component } from "react";

import Dropzone from "../../shared/dropzone/Dropzone";

const API = "http://localhost:3001/api/user/avatar";

export class ProfileLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateAvatar: false
    };
  }
  onCancel = () => {
    this.setState({
      isUpdateAvatar: !this.state.isUpdateAvatar
    });
  };

  render() {
    const { user, token } = this.props;
    return (
      <div className="profi-left">
        {this.state.isUpdateAvatar ? (
          <Dropzone
            api={API}
            email={token.email}
            onSuccess={this.props.onSuccess}
            onErr={this.props.onError}
            paramName="userAvatar"
          />
        ) : (
          <div className="pf-l--avatar">
            <img alt="avatar" src={user.profile.avatar} />
          </div>
        )}
        <div className="pf-l--button">
          {this.state.isUpdateAvatar ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.onCancel}
            >
              cancel
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                this.setState({
                  isUpdateAvatar: !this.state.isUpdateAvatar
                })
              }
            >
              change
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileLeft;
