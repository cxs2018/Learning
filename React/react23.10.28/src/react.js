import Component, { PureComponent } from "./Component";
import { wrapToVdom } from "./utils";
/**
 * 创建虚拟DOM
 * @param type
 * @param config
 * @param children
 * @returns {{type, props}}
 */
function createElement(type, config, children) {
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
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
    ref,
    key,
  };
}

function createRef() {
  return {
    current: null,
  };
}

function createContext() {
  function Provider(props) {
    if (!Provider._value) Provider._value = {};
    Object.assign(Provider._value, props.value);
    return props.children;
  }
  function Consumer(props) {
    return props.children(Provider._value);
  }
  return { Provider, Consumer };
}

function cloneElement(oldElement, newProps, ...newChildren) {
  let children = oldElement.props.children;
  // children可能是对象、undefined、数组
  if (children) {
    children = Array.isArray(children) ? children : [children];
  } else {
    children = [];
  }
  children.push(...newChildren);
  children = children.map(wrapToVdom);
  // 再还原
  if (children.length === 0) {
    children = undefined;
  } else if (children.length === 1) {
    children = children[0];
  }
  newProps.children = children;
  let props = { ...oldElement.props, ...newProps };
  return {
    ...oldElement,
    props,
  };
}

const React = {
  createElement,
  Component,
  createRef,
  createContext,
  cloneElement,
  PureComponent,
};

export default React;
