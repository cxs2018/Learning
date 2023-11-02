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

const React = {
  createElement,
  Component,
  createRef,
  createContext,
};

export default React;
