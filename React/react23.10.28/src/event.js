import { updateQueue } from "./Component";

/**
 * 注册事件，包装一下，加入react自己的逻辑  合成事件、AOP、装饰器模式
 * why ？
 * 1. 方便兼容性处理，不同浏览器的事件对象可能不一样
 * 2. 可以加入自定义逻辑
 * 之前 updateQueue.isBatchingUpdate = true;
 * 之后 updateQueue.batchUpdate();
 * @param dom
 * @param eventType
 * @param listener
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

let syntheicEvent = {}; // 合成对象

function dispatchEvent(event) {
  let { target, type } = event; // target 目标元素
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  createSyntheticEvent(event);
  // 事件冒泡，绑定事件的dom和触发的target可能不一样，如button内套了一个span
  while (target) {
    let { store } = target;
    let lisenter = store && store[eventType];
    lisenter && lisenter.call(target, syntheicEvent);
    target = target.parentNode;
  }
  syntheicEvent = {};
  updateQueue.isPending = false;
  updateQueue.batchUpdate();
}

function createSyntheticEvent(event) {
  for (const key in event) {
    syntheicEvent[key] = event[key];
  }
}
