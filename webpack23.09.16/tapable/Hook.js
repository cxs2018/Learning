class Hook {
  constructor(args) {
    if (!Array.isArray(args)) {
      args = [];
    }
    this._args = args; // 用来放参数列表
    this.taps = []; // 用来放钩子函数
    this._x = undefined;
    this.call = this._call;
  }

  tap(options, fn) {
    if (typeof options === "string") {
      options = {
        name: options,
      };
    }
    options.fn = fn;
    this._insert(options);
  }

  _insert(item) {
    this.taps.push(item);
  }

  _call(...args) {
    let callMethod = this._createCall();
    return callMethod.apply(this, args);
  }

  _createCall() {
    return this.compile({
      taps: this.taps,
      args: this._args,
    });
  }
}

module.exports = Hook;
