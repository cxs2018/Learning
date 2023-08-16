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

// 抽象工厂接口声明了一组能返回不同抽象产品的方法，这些产品属于同一个系列，且在高层主题或概念上具有相关性。
// 同系列的产品通常能相互搭配使用，系列产品可有多个变体，但不同变体的产品不能搭配使用
class GUIFactory {
  createButton() {

  }
  createCheckbox() {

  }
}

// 具体工厂可生成属于统一变体的系列产品，工厂会确保其创建的产品能相互搭配使用。具体工厂方法签名回返回一个抽象产品，但在方法内部则会对具体产品进行实例化
class WinFactory extends GUIFactory {
  createButton() {
    return new WinButton()
  }
  createCheckbox() {
    return new WinCheckbox()
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton()
  }
  createCheckbox() {
    return new MacCheckbox()
  }
}

// 系列产品中的特定产品必须有一个基础接口，所有产品变体都必须实现这个接口
class Button {
  paint() {}
}

// 具体产品有相应的具体工厂创建
class WinButton extends Button {
  paint() {
    // windows风格按钮创建过程
    console.log("绘制windows风格按钮")
  }
}

class MacButton extends Button {
  paint() {
    // mac风格按钮创建过程
    console.log("绘制mac风格按钮")
  }
}

// 系列产品中的特定产品必须有一个基础接口，所有产品变体都必须实现这个接口
class Checkbox {
  paint() {}
}

// 具体产品有相应的具体工厂创建
class WinCheckbox extends Checkbox {
  paint() {
    // windows风格复选框创建过程
    console.log("绘制windows风格复选框")
  }
}

class MacCheckbox extends Checkbox {
  paint() {
    // mac风格复选框创建过程
    console.log("绘制mac风格复选框")
  }
}

// 客户端代码仅通过抽象类型（GUIFactory、Button和Checkbox）使用工厂和产品，无需修改任何工厂或产品子类就能传递给客户端代码
class Application {
  constructor(factory) {
    this.factory = factory
    this.button = null
  }

  createUI() {
    this.button = this.factory.createButton()
    this.checkbox = this.factory.createCheckbox()
  }

  paint() {
    this.button.paint()
    this.checkbox.paint()
  }
}

class ApplicationConfigurator {
  constructor() {
    let config = {OS: "Mac"}
    if (config.OS === 'Windows') {
      this.factory = new WinFactory()
    } else if (config.OS === "Mac"){
      this.factory = new MacFactory()
    } else {
      throw new Error("错误！未知的操作系统")
    }

    let app = new Application(this.factory)

    app.createUI()
    app.paint()
  }
}

new ApplicationConfigurator()

// 简单工厂模式
class Human {
  printColor() {}
  talk() {}
}

class BlackHuman extends Human {
  printColor() {
    console.log("黑种人")
  }
  talk() {
    console.log("黑种人说话了")
  }
}

class WhiteHuman extends Human {
  printColor() {
    console.log("白种人")
  }
  talk() {
    console.log("白种人说话了")
  }
}

class YellowHuman extends Human {
  printColor() {
    console.log("黄种人")
  }
  talk() {
    console.log("黄种人说话了")
  }
}

class HumanFactory {
  createHuman(type) {
    if (type === 'black') {
      return new BlackHuman()
    } else if (type === 'white') {
      return new WhiteHuman()
    } else if (type === 'yellow') {
      return new YellowHuman()
    } else {
      return null
    }
  }
}

function NvWa() {
  let factory = new HumanFactory()

  console.log("开始创造黑种人......")
  let blackHuman = factory.createHuman("black");
  blackHuman.printColor()
  blackHuman.talk()

  console.log("开始创造白种人......")
  let whiteHuman = factory.createHuman("white");
  whiteHuman.printColor()
  whiteHuman.talk()

  console.log("开始创造黄种人......")
  let yellowHuman = factory.createHuman("yellow");
  yellowHuman.printColor()
  yellowHuman.talk()
}

NvWa()

console.log("--------------------------------")

// 工厂方法模式
class AbstractHumanFactory {
  createHuman() {}
}

class BlackHumanFactory extends AbstractHumanFactory {
  createHuman() {
    return new BlackHuman()
  }
}

class WhiteHumanFactory extends AbstractHumanFactory {
  createHuman() {
    return new WhiteHuman()
  }
}

class YellowHumanFactory extends AbstractHumanFactory {
  createHuman() {
    return new YellowHuman()
  }
}

function NvWaFactoryMethod() {
  let factory = null;

  console.log("开始创造黑种人......")
  factory = new BlackHumanFactory()
  let blackHuman = factory.createHuman()
  blackHuman.printColor()
  blackHuman.talk()

  console.log("开始创造白种人......")
  factory = new WhiteHumanFactory()
  let whiteHuman = factory.createHuman()
  whiteHuman.printColor()
  whiteHuman.talk()

  console.log("开始创造黄种人......")
  factory = new YellowHumanFactory()
  let yellowHuman = factory.createHuman()
  yellowHuman.printColor()
  yellowHuman.talk()
}

NvWaFactoryMethod()

(function() {
  
})()