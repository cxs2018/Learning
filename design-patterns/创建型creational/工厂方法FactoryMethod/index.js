/**
 * 创建者类声明的工厂方法必须返回一个产品类的对象。创建者的子类通常会提供
 * 该方法的实现
 */
class Dialog {
  /**
   * 创建者还可提供一些工厂方法的默认实现。
   */
  createButton() {}

  /**
   * 请注意，创建者的主要职责并非是创建产品。其中通常会包含一些核心业务
   * 逻辑，这些逻辑依赖于由工厂方法返回的产品对象。子类可通过重写工厂方
   * 法并使其返回不同类型的产品来间接修改业务逻辑。
   */
  render() {
    // 创建产品
    const okButton = this.createButton();
    // 使用产品
    okButton.onClick();
    okButton.render();
  }
}

/**
 * 具体创建者将重写工厂方法以改变其所返回的产品类型。
 */
class WindowsDialog extends Dialog {
  createButton() {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton() {
    return new HTMLButton();
  }
}

/**
 * 产品接口中将声明所有具体产品都必须实现的操作。
 */
class Button {
  render(params) {}
  onClick(params) {}
}

class WindowsButton extends Button {
  render() {
    console.log("windows button render");
  }
  onClick() {
    console.log("windows button click");
  }
}

class HTMLButton extends Button {
  render() {
    console.log("html button render");
  }
  onClick() {
    console.log("html button click");
  }
}

class Application {
  constructor() {
    this._dialog = null;
  }

  initialize() {
    const config = { env: "windows" };
    if (config.env === "windows") {
      this._dialog = new WindowsDialog();
    } else if (config.env === "web") {
      this._dialog = new WebDialog();
    } else {
      throw new Error("错误！未知的操作系统。");
    }
  }

  main() {
    this.initialize();
    this._dialog.render();
  }
}

new Application().main();
