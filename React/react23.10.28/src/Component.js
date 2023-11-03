import { compareTwoVdom, createDOM, findDOM } from "./react-dom";

/**
 * 批量更新
 * React可以自己控制的，走批量更新，在事件处理函数最开始置为true，结束执行更新，放到setTimeout、promise、nextTick、queueMicroTask里面的，是在事件
 * 处理函数退出之后，所以react控制不了，走立即更新
 */
export let updateQueue = {
  isBatchingUpdate: false, // 当前是否处于批量更新模式，默认是false
  updaters: [],
  batchUpdate() {
    for (let updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.updaters.length = 0;
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
    this.emitUpdate();
  }

  /**
   * 触发更新，状态、属性变化都会触发
   * @param newProps
   */
  emitUpdate(newProps) {
    this.nextProps = newProps;
    if (updateQueue.isBatchingUpdate) {
      // 如果当前是批量更新模式，先缓存updater
      updateQueue.updaters.push(this);
    } else {
      // 不是批量更新，直接更新组件
      this.updateClassComponent();
    }
  }

  updateClassComponent() {
    let { classInstance, pendingStates, callbacks, nextProps } = this;
    if (pendingStates.length > 0 || nextProps) {
      shouldUpdate(
        classInstance,
        nextProps,
        this.getState(nextProps),
        callbacks,
      );
    }
  }

  getState(nextProps) {
    let { classInstance, pendingStates, callbacks } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      // 如果是函数的话，需要执行下获取新状态，传入老状态
      if (typeof nextState === "function") {
        nextState = nextState.call(classInstance, state);
      }
      state = { ...state, ...nextState };
    });
    if (classInstance.ownVdom.type.getDerivedStateFromProps) {
      // 或者使用 classInstance.constructor
      let partialState = classInstance.ownVdom.type.getDerivedStateFromProps(
        nextProps,
        classInstance.state,
      );
      // TODO 这里暂时不支持函数
      if (partialState) {
        state = { ...state, ...partialState };
      }
    }
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
   * 强行更新组件
   */
  forceUpdate() {
    let nextState = this.state;
    let nextProps = this.props;
    if (this.constructor.getDerivedStateFromProps) {
      let partialState = this.constructor.getDerivedStateFromProps(
        nextProps,
        nextState,
      );
      if (partialState) {
        nextState = { ...nextState, ...partialState };
      }
    }
    this.state = nextState;
    this.updateComponent();
  }

  /**
   * 更新组件UI
   */
  updateComponent() {
    let newRenderVdom = this.render();
    let oldRenderVdom = this.oldRenderVdom;
    let oldDOM = findDOM(oldRenderVdom);
    let extraArgs =
      this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();
    let currentRenderVdom = compareTwoVdom(
      oldDOM.parentNode,
      oldRenderVdom,
      newRenderVdom,
    );
    this.oldRenderVdom = currentRenderVdom;
    if (this.componentDidUpdate) {
      // 这里应该传旧props、旧state
      this.componentDidUpdate(this.props, this.state, extraArgs);
    }
  }
}

/**
 * 简单粗暴更新节点，删除老的，新建新的，替换
 * @version 1
 * @param classInstance
 * @param newVdom
 * @deprecated
 */
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

/**
 * 判断组件是否需要更新
 * 不管组件UI要不要刷新，state一定要改变
 * @param classInstance
 * @param nextProps
 * @param nextState
 * @param callbacks
 */
function shouldUpdate(classInstance, nextProps, nextState, callbacks) {
  let willUpdate = true;
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(nextProps, nextState)
  ) {
    // shouldComponentUpdate返回false，不触发组件更新
    willUpdate = false;
  }
  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate();
  }
  // 先执行 shouldComponentUpdate、componentWillUpdate，保证方法内取到的是老state、老props，再更新state、props
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = nextState;
  if (willUpdate) {
    classInstance.updateComponent();
    callbacks.forEach((cb) => cb.call(classInstance));
    callbacks.length = 0;
  }
}

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shadowEqual(this.props, nextProps) || !shadowEqual(this.state, nextState)
    );
  }
}

/**
 * 浅比较两个对象是否相等
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
function shadowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
}

export default Component;
