export {};

function timeout(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

interface Task {
  task: () => any;
  resolve: (value: any) => void;
  reject: (value: any) => void;
}

class SuperTask {
  private readonly parallelCount: number;
  private taskList: Task[];
  private runningCount: number;
  constructor(parallel: number = 2) {
    this.parallelCount = parallel;
    this.taskList = [] as Task[];
    this.runningCount = 0;
  }
  add(task: () => any) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        task,
        reject,
        resolve,
      });
      this._run();
    });
  }

  _run() {
    while (this.runningCount < this.parallelCount && this.taskList.length) {
      const {
        task = () => {},
        resolve = (value: any) => {},
        reject = () => {},
      } = this.taskList.shift() || {};
      this.runningCount++;
      Promise.resolve(task()).then(() => {
        resolve(1);
        this.runningCount--;
        this._run();
      });
    }
  }
}

const superTask = new SuperTask(2);

function addTask(time: number, name: number | string) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(1000, 1);
addTask(1000, 2);
addTask(1000, 3);
addTask(1000, 4);
addTask(1000, 5);
