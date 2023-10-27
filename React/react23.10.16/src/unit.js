import React from "./react";
import { Element } from "./element";
import $ from "jquery";
import types from "./types";

let diffQueue = []; // 差异队列
let updateDepth = 0; // 更新的级别

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
    this._renderedChildrenUnits = [];
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
          childUnit._mountIndex = index; // 每个unit有个_mountIndex属性，用来指向自己在父节点中的位置
          this._renderedChildrenUnits.push(childUnit);
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

  update(nextElement) {
    let oldProps = this._currentElement.props;
    let newProps = nextElement.props;
    this.updateDOMProperties(oldProps, newProps);
    this.updateDOMChildren(nextElement.props.children);
  }

  /**
   * 更新props
   * @param oldProps
   * @param newProps
   */
  updateDOMProperties(oldProps, newProps) {
    let propName;
    for (propName in oldProps) {
      if (!newProps.hasOwnProperty(propName)) {
        // 老的有新的没有
        // 新props内没有这个属性，移除
        $(`[data-reactid="${this._reactid}"]`).removeAttr(propName);
        // 如果是事件，根据命名空间取消绑定
        if (/on[A-Z]/.test(propName)) {
          $(document).undelegate(`.${this._reactid}`);
        }
      }
    }
    for (propName in newProps) {
      if (propName === "children") {
        // 儿子属性先不处理
        continue;
      } else if (/^on[A-Z]/.test(propName)) {
        // 重新绑定事件
        let eventName = propName.slice(2).toLowerCase();
        // 先取消老事件 zhufeng好像没写，但是没出问题，奇怪，可能是jquery版本
        $(document).undelegate(`.${this._reactid}`);
        $(document).delegate(
          `[data-reactid="${this._reactid}"]`,
          `${eventName}.${this._reactid}`,
          newProps[propName],
        );
      } else if (propName === "className") {
        // $(`[data-reactid="${this._reactid}"]`)[0].className = newProps[propName];
        $(`[data-reactid="${this._reactid}"]`).attr(
          "class",
          newProps[propName],
        );
      } else if (propName === "style") {
        // 样式
        let styleObj = newProps[propName];
        Object.entries(styleObj).map(([attr, value]) => {
          // 这时候dom已经有了，直接调jquery css方法设置样式，不用提前驼峰转下划线
          $(`[data-reactid="${this._reactid}"]`).css(attr, value);
        });
      } else {
        $(`[data-reactid="${this._reactid}"]`).prop(
          propName,
          newProps[propName],
        );
      }
    }
  }

  /**
   * 更新儿子们，新儿子与老儿子对比，找出差异，进行修改DOM
   * @param newChildrenElements
   */
  updateDOMChildren(newChildrenElements) {
    updateDepth++;
    this.diff(diffQueue, newChildrenElements);
    updateDepth--;
    if (updateDepth === 0) {
      // 深度遍历完成
      this.patch(diffQueue);
      diffQueue = [];
    }
  }

  patch(diffQueue) {
    let deleteChildren = []; // 这里要放着所有将要删除的节点
    let deleteMap = {}; // 这里暂存能复用的节点
    for (let i = 0; i < diffQueue.length; i++) {
      let difference = diffQueue[i];
      if (difference.type === types.MOVE || difference.type === types.REMOVE) {
        // 删除、移动
        let fromIndex = difference.fromIndex;
        let oldChild = $(difference.parentNode.children().get(fromIndex));
        deleteMap[fromIndex] = oldChild;
        deleteChildren.push(oldChild);
      }
    }
    $.each(deleteChildren, (idx, item) => {
      $(item).remove(); // 加不加 $() 都行，是幂等的
    });
    for (let i = 0; i < diffQueue.length; i++) {
      let difference = diffQueue[i];
      switch (difference.type) {
        case types.INSERT:
          this.insertChildAt(
            difference.parentNode,
            difference.toIndex,
            $(difference.markUp),
          );
          break;
        case types.MOVE:
          this.insertChildAt(
            difference.parentNode,
            difference.toIndex,
            deleteMap[difference.fromIndex],
          );
          break;
      }
    }
  }

  insertChildAt(parentNode, index, newNode) {
    let oldChild = parentNode.children().get(index);
    oldChild ? newNode.insertBefore(oldChild) : newNode.appendTo(parentNode);
  }

  /**
   * 新老儿子diff
   * @param diffQueue
   * @param newChildrenElements
   */
  diff(diffQueue, newChildrenElements) {
    // 生成一个map，key=老unit
    let oldChildrenUnitMap = this.getOldChildrenMap(
      this._renderedChildrenUnits,
    );
    // 生成一个新儿子unit数组
    let { newChildrenUnits, newChildrenUnitMap } = this.getNewChildren(
      oldChildrenUnitMap,
      newChildrenElements,
    );
    let lastIndex = 0; // 上一个已经确定位置的索引
    for (let i = 0; i < newChildrenUnits.length; i++) {
      let newUnit = newChildrenUnits[i];
      // 拿到新孩子的key
      let newKey =
        (newUnit._currentElement.props && newUnit._currentElement.props.key) ||
        i.toString();
      // 用新key去老unit map里面找有没有
      let oldChildUnit = oldChildrenUnitMap[newKey];
      if (oldChildUnit === newUnit) {
        // 如果新老一致的话，说明是复用老节点
        if (oldChildUnit._mountIndex < lastIndex) {
          // 说明老儿子要移动
          diffQueue.push({
            parentId: this._reactid,
            parentNode: $(`[data-reactid="${this._reactid}"]`),
            type: types.MOVE,
            fromIndex: oldChildUnit._mountIndex,
            toIndex: i,
          });
        }
        lastIndex = Math.max(lastIndex, oldChildUnit._mountIndex);
      } else {
        // 老的有，但是没有复用，因为type不一样
        if (oldChildUnit) {
          // key一样，类型不一样，需要删掉老的
          diffQueue.push({
            parentId: this._reactid,
            parentNode: $(`[data-reactid="${this._reactid}"]`),
            type: types.REMOVE,
            fromIndex: oldChildUnit._mountIndex,
          });
          $(document).undelegate(`.${oldChildUnit._reactid}`);
        }
        // 或者老的没有 oldChildUnit = undefined
        diffQueue.push({
          parentId: this._reactid,
          parentNode: $(`[data-reactid="${this._reactid}"]`),
          type: types.INSERT,
          toIndex: i,
          markUp: newUnit.getMarkUp(`${this._reactid}.${i}`),
        });
      }

      newUnit._mountIndex = i;
    }
    for (let oldKey in oldChildrenUnitMap) {
      if (!newChildrenUnitMap.hasOwnProperty(oldKey)) {
        // 老儿子在新儿子数组中里面没有，要删除
        diffQueue.push({
          parentId: this._reactid,
          parentNode: $(`[data-reactid="${this._reactid}"]`),
          type: types.REMOVE,
          fromIndex: oldChildrenUnitMap[oldKey]._mountIndex,
        });
      }
    }
    console.log("diffQueue", diffQueue);
  }

  /**
   * 获取新儿子，根据老儿子的unit，和新儿子虚拟dom
   * @param oldChildrenUnitMap
   * @param newChildrenElements
   */
  getNewChildren(oldChildrenUnitMap, newChildrenElements) {
    let newChildrenUnits = [];
    let newChildrenUnitMap = {};
    newChildrenElements.forEach((newElement, index) => {
      let newKey =
        (newElement.props && newElement.props.key) || index.toString();
      let oldUnit = oldChildrenUnitMap[newKey]; // 去老的儿子集合里找找有没有新儿子
      let oldElement = oldUnit && oldUnit._currentElement; // 获取老元素
      if (shouldDeepCompare(oldElement, newElement)) {
        // 类型一样，递归
        oldUnit.update(newElement);
        // 改了老的，复用
        newChildrenUnits.push(oldUnit);
        newChildrenUnitMap[newKey] = oldUnit;
      } else {
        // 类型不一样，新建新的
        let newUnit = createUnit(newElement);
        newChildrenUnits.push(newUnit);
        newChildrenUnitMap[newKey] = newUnit;
      }
    });
    return { newChildrenUnits, newChildrenUnitMap };
  }

  getOldChildrenMap(childrenUnits = []) {
    let map = {};
    for (let i = 0; i < childrenUnits.length; i++) {
      let key =
        (childrenUnits[i] &&
          childrenUnits[i]._currentElement.props &&
          childrenUnits[i]._currentElement.props.key) ||
        i.toString();
      map[key] = childrenUnits[i];
    }
    return map;
  }
}

class CompositeUnit extends Unit {
  getMarkUp(reactid) {
    this._reactid = reactid;
    let { type: Component, props } = this._currentElement;
    let componentInstance = (this._componentInstance = new Component(props));
    componentInstance._currentUnit = this;
    componentInstance.componentWillMount &&
      componentInstance.componentWillMount();
    let renderedElement = componentInstance.render();
    let renderedUnitInstance = (this._renderedUnitInstance =
      createUnit(renderedElement));
    let renderedMarkup = renderedUnitInstance.getMarkUp(this._reactid);
    $(document).on("mounted", () => {
      componentInstance.componentDidMount &&
        componentInstance.componentDidMount();
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
