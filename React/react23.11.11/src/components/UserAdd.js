import React, { Component } from "react";
import { UserAPI } from "../utils";
export default class UserAdd extends Component {
  usernameRef;
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.usernameRef.current.value;
    UserAPI.add({ id: Date.now() + "", username });
    this.props.history.push("/user/list");
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={this.usernameRef} />
        <button type="submit">提交</button>
      </form>
    );
  }
}
