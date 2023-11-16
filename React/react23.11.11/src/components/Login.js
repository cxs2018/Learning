import React from "react";

function Login(props) {
  return (
    <button
      onClick={() => {
        localStorage.setItem("login", "true");
        if (props.location.state.from) {
          props.history.push(props.location.state.from || "/");
        }
      }}
    >
      登录
    </button>
  );
}

export default Login;
