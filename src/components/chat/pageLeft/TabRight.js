import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spiner from "../../../shared/spiner/Spiner";

import * as friendActions from "../../../actions/friends";
import NotifyPortal from "../../../UI/Notify/NotifyPortal";

const TabRight = props => {
  const {
    listUser,
    loading,
    makeFriend,
    user,
    friendReducer,
    loadFriends
  } = props;

  useEffect(() => {
    if (user) {
      loadFriends(user._id);
    }
  }, [user]);

  const addFriend = id => {
    makeFriend(user._id, id);
  };
  console.log("friends", friendReducer);

  /**
   * render user want to make friend with you
   */
  const renderRequierdFriend = () => {
    return friendReducer.friends.map((value, i) => (
      <div className="one-friend" key={i}>
        <div className="img-item">
          <img
            src={value.profile.avatar}
            alt={value.profile.firstName + " image"}
          />
        </div>
        <p className="p-add-friend">
          {/* <i
            className="fa fa-user-plus"
            onClick={() => addFriend(value._id)}
          ></i> */}
          {value.status ? "friend" : "not friend"}
        </p>
        <div className="per-name">{value.profile.firstName}</div>
      </div>
    ));
  };

  /**
   * render user find out
   */
  const renderUser = () => {
    return listUser.map((value, i) => (
      <div className="one-friend" key={i}>
        <div className="img-item">
          <img
            src={value.profile.avatar}
            alt={value.profile.firstName + " image"}
          />
        </div>
        <p className="p-add-friend">
          <i
            className="fa fa-user-plus"
            onClick={() => addFriend(value._id)}
          ></i>
        </p>
        <div className="per-name">{value.profile.firstName}</div>
      </div>
    ));
  };
  console.log("load right");
  return (
    <>
      {friendReducer && friendReducer.successMess && (
        <NotifyPortal message={"require friend success"} />
      )}
      {loading ? (
        <div className="text-center">
          <Spiner width="50px" height="50px" background="gray" margin="auto" />
        </div>
      ) : (
        <div className="pl-friends">
          {renderUser()}
          {renderRequierdFriend()}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.findUserReducer.loading,
    listUser: state.findUserReducer.users,
    user: state.userReducer.user,
    friendReducer: state.friendReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeFriend: (idUser, idFriend) =>
      dispatch(friendActions.makeFriend(idUser, idFriend)),
    loadFriends: idUser => dispatch(friendActions.loadFriends(idUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRight);
