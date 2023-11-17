import React from "react";
import Link from "./Link";
import { __RouterContext, matchPath, Route } from "../react-router";

function NavLink(props) {
  let context = React.useContext(__RouterContext);
  let {
    location: { pathname },
  } = context;
  const {
    to: path, // Link 指向的路径
    className: classNameProps = "", // 基本的类名
    style: styleProps = {}, // 基本的行内样式
    activeClassName = "active", // 激活的类名
    activeStyle = {}, // 激活的行内样式
    children, // 儿子
    exact, // 是否要精确匹配
  } = props;
  let isActive = matchPath(pathname, { path, exact }); //pathname浏览器的路径 path来自于NavLink的配置
  let className = isActive
    ? joinClassNames(classNameProps, activeClassName)
    : classNameProps;
  let style = isActive ? { ...styleProps, ...activeStyle } : styleProps;
  let linkProps = {
    className,
    style,
    to: path,
    children,
  };
  return <Link {...linkProps} />;
}

function joinClassNames(...classNames) {
  // 过滤掉假值
  return classNames.filter((c) => c).join(" ");
}

function NavLinkWithRoute(props) {
  const {
    to: path, // Link 指向的路径
    className: classNameProps = "", // 基本的类名
    style: styleProps = {}, // 基本的行内样式
    activeClassName = "active", // 激活的类名
    activeStyle = {}, // 激活的行内样式
    children, // 儿子
    exact, // 是否要精确匹配
  } = props;
  return (
    <Route path={path} exact={exact}>
      {({ match }) => {
        let className = match
          ? joinClassNames(classNameProps, activeClassName)
          : classNameProps;
        let style = match ? { ...styleProps, ...activeStyle } : styleProps;
        let linkProps = {
          className,
          style,
          to: path,
          children,
        };
        return <Link {...linkProps} />;
      }}
    </Route>
  );
}

export default NavLinkWithRoute;
