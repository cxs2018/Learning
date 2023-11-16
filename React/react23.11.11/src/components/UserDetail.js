import React, { Component } from "react";
import { UserAPI } from "../utils";
export default class UserDetail extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    let user = this.props.location.state;
    if (!user) {
      let id = this.props.match.params.id;
      user = UserAPI.find(id);
    }
    if (user) this.setState({ user });
  }
  render() {
    let user = this.state.user;
    return (
      <div>
        {user.id}:{user.username}
      </div>
    );
  }
}
