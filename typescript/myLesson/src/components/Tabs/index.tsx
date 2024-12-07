import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Icon } from "antd";
import "./index.less";

interface Props {}

function Tabs(_props: Props) {
  return (
    <footer>
      <NavLink exact to="/">
        <Icon type={"home"} />
        <span>首页</span>
      </NavLink>
      <NavLink to="/mine">
        <Icon type={"shopping-cart"} />
        <span>我的</span>
      </NavLink>
      <NavLink to="/profile">
        <Icon type={"user"} />
        <span>个人中心</span>
      </NavLink>
    </footer>
  );
}

export default Tabs;
