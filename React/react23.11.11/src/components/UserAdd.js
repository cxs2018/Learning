import React, { Component } from "react";
import { UserAPI } from "../utils";
import { Prompt } from "../react-router";
export default class UserAdd extends Component {
  usernameRef;
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.state = {
      isBlocking: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(
      {
        isBlocking: false,
      },
      () => {
        let username = this.usernameRef.current.value;
        UserAPI.add({ id: Date.now() + "", username });
        this.props.history.push("/user/list");
      },
    );
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Prompt
          when={this.state.isBlocking}
          message={(location) => `请问你确定要跳转到${location.pathname}吗?`}
        />
        <input
          type="text"
          ref={this.usernameRef}
          onChange={(event) => {
            this.setState({
              isBlocking: event.target.value.length > 0,
            });
          }}
        />
        <button type="submit">提交</button>
      </form>
    );
  }
}
