import { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./scheduler";

let id = 0;

class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.dirty = !!options.lazy;
    this.cb = cb;
    this.options = options;
    this.id = id++;
    if (typeof exprOrFn === "string") {
      this.getter = function () {
        // 当进行数据取值时，会进行依赖收集
        let path = exprOrFn.split(".");
        let obj = vm;
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]];
        }
        // vm["age.n"] 转换为 vm["age"]["n"]
        return obj;
      };
    } else {
      // 默认应该让 exprOrFn 执行
      this.getter = exprOrFn; // updateComponent
    }
    this.deps = [];
    this.depsId = new Set();

    // oldValue
    this.value = this.lazy ? undefined : this.get();
  }

  get() {
    pushTarget(this);
    const value = this.getter.call(this.vm);
    popTarget();
    return value;
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  run() {
    let newValue = this.get();
    let oldValue = this.value;
    this.value = newValue;
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue);
    }
  }

  evaluate() {
    this.dirty = false; // 为false表示取过值了
    this.value = this.get();
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}

export default Watcher;
