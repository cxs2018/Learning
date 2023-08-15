// 策略接口是所有具体策略的通用接口，它声明了一个上下文用于执行策略的方法
class Strategy {
  execute(data) { }
}

// 具体策略实现了上下文所用算法的各种不同变体
class OneStrategy extends Strategy {
  execute(data) {
    console.log("具体策略1", data)
  }
}

class AnotherStrategy extends Strategy {
  execute(data) {
    console.log("具体策略2", data)
  }
}

// 上下文维护指向具体策略的引用，且仅通过策略接口与该对象进行交流
class Context {
  constructor() {
    this.strategy = null
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  // 当上下文需要运行算法时，它会在其已连接的策略对象上调用执行方法，上下文不清楚其所涉及的策略类型与算法的执行方式
  doSomething(data) {
    this.strategy.execute(data)
  }
}

// 客户端会创建一个特定策略对象并将其传递给上下文，上下文则会提供一个设置器以便客户端在运行时替换相关联的策略
class Client {
  constructor() {
    this.context = new Context()
  }

  doOneThing(data) {
    let str = new OneStrategy()
    this.context.setStrategy(str)
    this.context.doSomething(data)
  }

  doOtherThing(data) {
    let str = new AnotherStrategy()
    this.context.setStrategy(str)
    this.context.doSomething(data)
  }
}