import Component, { PureComponent } from "./Component";
import { wrapToVdom } from "./utils";
import {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "./react-dom";

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

function createContext(initialValue = {}) {
  let context = { Provider, Consumer };
  function Provider(props) {
    context._currentValue = context._currentValue || initialValue;
    Object.assign(context._currentValue, props.value);
    return props.children;
  }
  function Consumer(props) {
    return props.children(context._currentValue);
  }
  return context;
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

function memo(FunctionComponent) {
  return class extends PureComponent {
    render() {
      return FunctionComponent(this.props);
    }
  };
}

const React = {
  createElement,
  Component,
  createRef,
  createContext,
  cloneElement,
  PureComponent,
  useState,
  memo,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
};

export default React;
