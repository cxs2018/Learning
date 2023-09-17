class SyncHookCodeFactory {
  setup(instance, options) {
    this.options = options;
    instance._x = options.taps.map((item) => item.fn);
  }

  args() {
    return this.options.args.join(",");
  }

  header() {
    return `var _x = this._x;\n`;
  }

  content() {
    return this.options.taps
      .map((item, index) => {
        return `var _fn${index} = _x[${index}];
                _fn${index}(name, age)
      `;
      })
      .join("\n");
  }

  create() {
    return new Function(this.args(), this.header() + this.content());
  }
}

module.exports = SyncHookCodeFactory;
