import { createDOM } from "./react-dom";

/**
 * 批量更新
 * React可以自己控制的，走批量更新，在事件处理函数最开始置为true，结束执行更新，放到setTimeout、promise、nextTick、queueMicroTask里面的，是在事件
 * 处理函数退出之后，所以react控制不了，走立即更新
 */
export let updateQueue = {
  isBatchingUpdate: false, // 当前是否处于批量更新模式，默认是false
  updaters: new Set(),
  batchUpdate() {
    for (let updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false;
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 等待生效的状态，可能是一个对象，也可能是一个函数
    this.callbacks = [];
  }

  addState(partialState, callback) {
    this.pendingStates.push(partialState);
    if (typeof callback === "function") {
      this.callbacks.push(callback);
    }
    if (updateQueue.isBatchingUpdate) {
      // 如果当前是批量更新模式，先缓存updater
      updateQueue.updaters.add(this);
    } else {
      // 不是批量更新，直接更新组件
      this.updateClassComponent();
    }
  }

  updateClassComponent() {
    let { classInstance, pendingStates, callbacks } = this;
    if (pendingStates.length > 0) {
      classInstance.state = this.getState(); // 计算最新状态
      classInstance.forceUpdate();
      callbacks.forEach((cb) => cb.call(classInstance));
      callbacks.length = 0;
    }
  }

  getState() {
    let { classInstance, pendingStates, callbacks } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      // 如果是函数的话，需要执行下获取新状态，传入老状态
      if (typeof nextState === "function") {
        nextState = nextState.call(classInstance, state);
      }
      state = { ...state, ...nextState };
    });
    pendingStates.length = 0;
    return state;
  }
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  render() {
    throw new Error("需要子类实现render方法");
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }

  /**
   * 强制更新组件UI
   */
  forceUpdate() {
    let newVdom = this.render();
    updateClassComponent(this, newVdom);
  }
}

function updateClassComponent(classInstance, newVdom) {
  // 取出this上挂的老真实DOM
  let oldDOM = classInstance.dom;
  // 根据新虚拟DOM创建新真实DOM
  let newDOM = createDOM(newVdom);
  // 用新真实DOM替换老真实DOM
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  // 更新新真实DOM到this上
  classInstance.dom = newDOM;
}

export default Component;
