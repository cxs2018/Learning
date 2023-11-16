import React, { Component } from "react";
import { Link } from "../react-router-dom";
import { UserAPI } from "../utils";
export default class UserList extends Component {
  state = { users: [] };
  componentDidMount() {
    let users = UserAPI.list();
    this.setState({ users });
  }
  render() {
    return (
      <ul>
        {this.state.users.map((user, index) => (
          <li key={index}>
            <Link to={{ pathname: `/user/detail/${user.id}`, state: user }}>
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
