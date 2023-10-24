import React from "./react";

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
}

/**
 * 根据element类型创建对应单元
 * @param element
 */
function createUnit(element) {
  if (typeof element === "string" || typeof element === "number") {
    return new TextUnit(element);
  }
}

export { createUnit };
