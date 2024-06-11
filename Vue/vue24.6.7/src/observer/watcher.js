import { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./scheduler";

let id = 0;

class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++;
    // 默认应该让 exprOrFn 执行
    this.getter = exprOrFn;
    this.deps = [];
    this.depsId = new Set();

    this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
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
    queueWatcher(this);
  }

  run() {
    this.get();
  }
}

export default Watcher;
