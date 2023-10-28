function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

/**
 * 虚拟DOM转换为真实DOM
 * @param vdom
 * @returns {*|Text}
 */
function createDOM(vdom) {
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }
  let { type, props } = vdom;
  let dom;
  if (typeof type === "function") {
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }
  updateProps(dom, props);
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    dom.textContent = props.children;
  } else if (typeof props.children === "object" && props.children.type) {
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    document.textContent = props.children ? props.children.toString() : "";
  }
  // vdom.dom = dom;
  return dom;
}

/**
 * 更新props
 * @param dom
 * @param newProps
 */
function updateProps(dom, newProps) {
  for (const key in newProps) {
    if (key === "children") continue;
    if (key === "style") {
      let styleObj = newProps.style;
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
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
  return createDOM(renderVdom);
}

const ReactDOM = {
  render,
};

export default ReactDOM;
