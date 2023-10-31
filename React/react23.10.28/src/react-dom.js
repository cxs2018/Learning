import { addEvent } from "./event";
import { REACT_TEXT } from "./constants";

function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
  dom.componentDidMount && dom.componentDidMount();
}

/**
 * 虚拟DOM转换为真实DOM
 * @param vdom
 * @returns {*|Text}
 */
export function createDOM(vdom) {
  let { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    // 文本节点
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      // 类组件
      return mountClassComponent(vdom);
    } else {
      // 函数组件
      return mountFunctionComponent(vdom);
    }
  } else {
    // 原生节点
    dom = document.createElement(type);
  }
  updateProps(dom, {}, props);
  if (typeof props.children === "object" && props.children.type) {
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  }
  // 当根据一个vdom创建出来一个真实dom之后，把真实dom挂载到虚拟dom上
  vdom.dom = dom;
  return dom;
}

/**
 * 更新props
 * @param dom
 * @param oldProps
 * @param newProps
 */
function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === "children") continue;
    if (key === "style") {
      let styleObj = newProps.style;
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith("on")) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      // 采用事件委托（事件代理），方便react控制
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      // className 在js中，dom.className 就是原生的写法给dom赋类名
      dom[key] = newProps[key];
    }
  }
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}

function mountFunctionComponent(vdom) {
  let { type: FunctionComponent, props } = vdom;
  let renderVdom = FunctionComponent(props);
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function mountClassComponent(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  vdom.classInstance = classInstance;
  let renderVdom = classInstance.render();
  // 挂载到虚拟dom上
  vdom.oldRenderVdom = renderVdom;
  // 组件实例this上也挂载下
  classInstance.oldRenderVdom = renderVdom;
  let dom = createDOM(renderVdom);
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
  }
  classInstance.dom = dom;
  return dom;
}

/**
 * 对当前组件进行DOM-diff比较
 * @param parentDOM 当前组件挂载的父真实DON节点
 * @param oldVdom 上一次的虚拟DOM
 * @param newVdom 这一次新的虚拟DOM
 * @param nextDOM 要插入节点的插入位置，将会插到这个节前面
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  // 新老虚拟dom都没有
  if (!oldVdom && !newVdom) {
    return null;
  } else if (oldVdom && !newVdom) {
    // 老的有，新的没有 -> 删掉老的
    let currentDOM = findDOM(oldVdom);
    if (currentDOM) {
      parentDOM.removeChild(currentDOM);
    }
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    return null;
  } else if (newVdom && !oldVdom) {
    // 新的有，老的没有 -> 新建新的
    let newDOM = createDOM(newVdom);
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
    return newVdom;
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    // 新老dom都有，但是类型不一样
    let oldDOM = findDOM(oldVdom);
    let newDOM = findDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
  } else {
    // 新老dom都有，且类型一致，进行深度比较，需要更新自己的属性、深度比较儿子们
    updateElement(oldVdom, newVdom);
    return newVdom;
  }
}

/**
 * 深度比较这两个虚拟DOM
 * @param oldVdom 老虚拟DOM
 * @param newVdom 新虚拟DOM
 */
function updateElement(oldVdom, newVdom) {
  if (oldVdom.type === REACT_TEXT) {
    // 新老都是文本节点
    let currentDOM = (newVdom.dom = oldVdom.dom);
    currentDOM.textContent = newVdom.props.content;
  } else if (typeof oldVdom.type === "string") {
    // 是个原生节点 div
    let currentDOM = (newVdom.dom = oldVdom.dom);
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === "function") {
    if (oldVdom.type.isReactComponent) {
      // 类组件
      newVdom.classInstance = oldVdom.classInstance;
      newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
      updateClassComponent(oldVdom, newVdom);
    } else {
      // updateFunctionComponent(oldVdom, newVdom);
    }
  }
}

/**
 * 如果老的虚拟DOM和新的虚拟DOM都是类组件的话，走这个逻辑
 * @param oldVdom 老的虚拟DOM节点
 * @param newVdom 新的虚拟DOM节点
 */
function updateClassComponent(oldVdom, newVdom) {
  let classInstance = (newVdom.classInstance = oldVdom.classInstance);
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps();
  }
  classInstance.updater.emitUpdate(newVdom.props);
}

/**
 * 查找此虚拟DOM对应的真实DOM，类组件、函数组件、原生dom处理方式不一样
 * @param vdom
 */
function findDOM(vdom) {
  let { type } = vdom;
  let dom;
  if (typeof type === "function") {
    // 类组件、函数组件
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    // 原生dom
    dom = vdom.dom;
  }
  return dom;
}

/**
 * 深度比较儿子们
 * @param parentDOM
 * @param oldVChildren
 * @param newVChildren
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i]);
  }
}

const ReactDOM = {
  render,
};

export default ReactDOM;
