import { addEvent } from "./event";
import { REACT_TEXT } from "./constants";

// 存放状态的数组
let hookStates = [];
// 状态的索引
let hookIndex = 0;
let scheduleUpdate;

function render(vdom, container) {
  mount(vdom, container);
  scheduleUpdate = () => {
    hookIndex = 0;
    compareTwoVdom(container, vdom, vdom);
  };
}

function mount(vdom, container) {
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
  let { type, props, ref } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    // 文本节点
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      // 类组件
      dom = mountClassComponent(vdom);
    } else {
      // 函数组件
      dom = mountFunctionComponent(vdom);
    }
  } else {
    // 原生节点
    dom = document.createElement(type);
    // 下面的操作，只在原生节点下做，因为类组件和函数组件会自己处理
    updateProps(dom, {}, props);
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  // 当根据一个vdom创建出来一个真实dom之后，把真实dom挂载到虚拟dom上
  vdom.dom = dom;
  if (ref) {
    ref.current = dom;
  }
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
    mount(childVdom, parentDOM);
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
  if (type.contextType) {
    classInstance.context = type.contextType.Provider._value;
  }
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  if (type.getDerivedStateFromProps) {
    let partialState = type.getDerivedStateFromProps(
      classInstance.props,
      classInstance.state,
    );
    if (partialState) {
      classInstance.state = { ...classInstance.state, ...partialState };
    }
  }
  // 在实例上挂vdom属性，方便后续实例访问vdom，进而访问type，拿到类静态方法 getDerivedStateFromProps
  classInstance.ownVdom = vdom;
  vdom.classInstance = classInstance;
  let renderVdom = classInstance.mount();
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
    newDOM.componentDidMount && newDOM.componentDidMount();
    return newVdom;
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    // 新老dom都有，但是类型不一样
    let oldDOM = findDOM(oldVdom);
    let newDOM = findDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM);
    newDOM.componentDidMount && newDOM.componentDidMount();
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
      updateFunctionComponent(oldVdom, newVdom);
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
 * 新老虚拟dom都是函数组件
 * @param oldVdom
 * @param newVdom
 */
function updateFunctionComponent(oldVdom, newVdom) {
  let parentDOM = findDOM(oldVdom).parentNode;
  let { type, props } = newVdom;
  let oldRenderVdom = oldVdom.oldRenderVdom;
  let newRenderVdom = type(props);
  newVdom.oldRenderVdom = newRenderVdom;
  compareTwoVdom(parentDOM, oldRenderVdom, newRenderVdom);
}

/**
 * 查找此虚拟DOM对应的真实DOM，类组件、函数组件、原生dom处理方式不一样
 * @param vdom
 */
export function findDOM(vdom) {
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
    let nextDOM = oldVChildren.find(
      (item, index) => index > i && item && item.dom,
    );
    compareTwoVdom(
      parentDOM,
      oldVChildren[i],
      newVChildren[i],
      nextDOM && nextDOM.dom,
    );
  }
}

/**
 * 让函数组件可以使用状态
 * 问题：函数组件卸载后，会影响后面的，因为当前的实现是所有函数组件共有一个索引和数组，当有组件卸载后，索引和数组却没修改
 * 解决：Fiber，每个函数组件有自己的index和list，不会相互影响
 * @param initialState
 */
export function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    scheduleUpdate();
  }
  return [hookStates[hookIndex++], setState];
}

const ReactDOM = {
  render,
};

export default ReactDOM;
