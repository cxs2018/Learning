import Component from "./Component";
import { wrapToVdom } from "./utils";
/**
 * 创建虚拟DOM
 * @param type
 * @param config
 * @param children
 * @returns {{type, props}}
 */
function createElement(type, config, children) {
  if (config) {
    delete config.__source;
    delete config.__self;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }
  return {
    type,
    props,
  };
}

const React = {
  createElement,
  Component,
};

export default React;
