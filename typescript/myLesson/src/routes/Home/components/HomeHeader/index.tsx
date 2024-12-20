import React, { useState } from "react";
import "./index.less";
import logo from "@/assets/images/img.png";
import classnames from "classnames";
import { Icon } from "antd";
// let logo = require("../../../../assets/images/img.png");

interface Props {
  currentCategory?: string;
  setCurrentCategory?: (currentCategory: string) => any;
}

function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo} />
        <Icon
          type={"bars"}
          onClick={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
        />
      </div>
      {isMenuVisible && (
        <ul className={"category"}>
          <li
            data-category="all"
            className={classnames({ active: props.currentCategory === "all" })}
          >
            全部课程
          </li>
          <li
            data-category="react"
            className={classnames({
              active: props.currentCategory === "react",
            })}
          >
            React课程
          </li>
          <li
            data-category="vue"
            className={classnames({ active: props.currentCategory === "vue" })}
          >
            Vue课程
          </li>
        </ul>
      )}
    </header>
  );
}

export default HomeHeader;
