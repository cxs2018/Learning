import React from "./react";
import { Element } from "./element";
import $ from "jquery";

class Unit {
  constructor(element) {
    this._currentElement = element;
  }

  getMarkUp() {
    throw Error("不能调用抽象类方法");
  }
}

class TextUnit extends Unit {
  getMarkUp(reactid) {
    this._reactid = reactid;
    return `<span data-reactid="${reactid}">${this._currentElement}</span>`;
  }

  update(nextElement) {
    if (this._currentElement !== nextElement) {
      this._currentElement = nextElement;
      $(`[data-reactid="${this._reactid}"]`).html(this._currentElement);
    }
  }
}

/**
 * 处理原生dom节点
 */
class NativeUnit extends Unit {
  getMarkUp(reactid) {
    this._reactid = reactid;
    const { type, props } = this._currentElement;
    let tagStart = `<${type} data-reactid="${this._reactid}"`;
    let childString = "";
    let tagEnd = `</${type}>`;
    for (const propName in props) {
      if (/^on[A-Z]/.test(propName)) {
        // 事件
        let eventName = propName.slice(2).toLowerCase();
        // 此时还没有该元素，委托给document
        $(document).delegate(
          `[data-reactid="${this._reactid}"]`,
          `${eventName}.${this._reactid}`,
          props[propName],
        );
      } else if (propName === "style") {
        // 样式
        let styleObj = props[propName];
        const styles = Object.entries(styleObj)
          .map(([attr, value]) => {
            return `${attr.replace(
              /[A-Z]/g,
              (m) => `-${m.toLowerCase()}`,
            )}:${value}`;
          })
          .join(";");
        tagStart += ` style="${styles}" `;
      } else if (propName === "children") {
        // 迭代处理子节点
        let children = props[propName];
        children.map((child, index) => {
          let childUnit = createUnit(child);
          let childMarkUp = childUnit.getMarkUp(`${this._reactid}.${index}`);
          childString += childMarkUp;
        });
      } else if (propName === "className") {
        // 类名
        tagStart += ` class="${props[propName]}"}`;
      } else {
        tagStart += ` ${propName}=${props[propName]} `;
      }
    }
    return tagStart + ">" + childString + tagEnd;
  }
}

class CompositeUnit extends Unit {
  getMarkUp(reactid) {
    this._reactid = reactid;
    let { type: Component, props } = this._currentElement;
    let componentInstance = (this._componentInstance = new Component(props));
    componentInstance._currentUnit = this;
    componentInstance.componentDidMount &&
      componentInstance.componentDidMount();
    let renderedElement = componentInstance.render();
    let renderedUnitInstance = (this._renderedUnitInstance =
      createUnit(renderedElement));
    let renderedMarkup = renderedUnitInstance.getMarkUp(this._reactid);
    $(document).on("mounted", () => {
      componentInstance.componentWillUnMount &&
        componentInstance.componentWillUnMount();
    });
    return renderedMarkup;
  }

  update(nextElement, partialState) {
    this._currentElement = nextElement || this._currentElement;
    let nextState = (this._componentInstance.state = Object.assign(
      this._componentInstance.state,
      partialState,
    ));
    let nextProps = this._currentElement.props;
    if (
      this._componentInstance.shouldComponentUpdate &&
      !this._componentInstance.shouldComponentUpdate(nextProps, nextProps)
    ) {
      // shouldComponentUpdate 函数返回false时，取消更新，但state会更新
      return;
    }
    // 得到上次的渲染单元
    let preRenderedUnitInstance = this._renderedUnitInstance;
    // 得到上次渲染的虚拟dom
    let preRenderedElement = preRenderedUnitInstance._currentElement;
    let nextRenderedElement = this._componentInstance.render();
    // 如果新旧元素类型一样，进行深度比较；不一样直接干掉老元素，新建新元素
    if (shouldDeepCompare(preRenderedElement, nextRenderedElement)) {
      preRenderedUnitInstance.update(nextRenderedElement);
      this._componentInstance.componentDidUpdate &&
        this._componentInstance.componentDidUpdate();
    } else {
      this._renderedUnitInstance = createUnit(nextRenderedElement);
      let nextMarkUp = this._renderedUnitInstance.getMarkUp(this._reactid);
      $(`[data-reactid="${this._reactid}"]`).replaceWith(nextMarkUp);
    }
  }
}

/**
 * 根据element类型创建对应单元
 * @param element
 *
 */
function createUnit(element) {
  if (typeof element === "string" || typeof element === "number") {
    return new TextUnit(element);
  }
  if (element instanceof Element && typeof element.type === "string") {
    // 原生dom节点
    return new NativeUnit(element);
  }
  if (element instanceof Element && typeof element.type === "function") {
    // 类组件
    return new CompositeUnit(element);
  }
}

function shouldDeepCompare(oldElement, newElement) {
  if (oldElement != null && newElement != null) {
    let oldType = typeof oldElement;
    let newType = typeof newElement;
    if (
      (oldType === "string" || oldType === "number") &&
      (newType === "string" || newType === "number")
    ) {
      return true;
    }
    // 新旧元素都是虚拟dom
    if (oldElement instanceof Element && newElement instanceof Element) {
      return oldElement.type === newElement.type;
    }
  }
  return false;
}

export { createUnit };
