class Observer {
  update() {}
}

class Subject {
  constructor() {
    this._observers = {};
    this._observersIndex = 0;
  }
  attach(observer) {
    // 将观察者存下来
    this._observers[this._observersIndex] = observer;
    // 在观察者身上赋给一个标识，方便后面快速移除观察者
    observer._observersIndex = this._observersIndex;
    // 观察者坑位+1
    this._observersIndex++;
  }
  detach(observer) {
    // 移除观察者
    delete this._observers[observer._observersIndex];
  }
  notify() {
    for (const observerIndex in this._observers) {
      this._observers[observerIndex].update(this);
    }
  }
}

class ClockTimer extends Subject {
  constructor() {
    super();
    this._hour = "";
    this._minute = "";
    this._second = "";
  }
  tick() {
    this.timer = setInterval(() => {
      const date = new Date();
      this._hour = date.getHours();
      this._minute = date.getMinutes();
      this._second = date.getSeconds();
      console.log("发出时间变化通知");
      this.notify();
    }, 1000);
  }
  getHour() {
    return this._hour;
  }
  getMinute() {
    return this._minute;
  }
  getSecond() {
    return this._second;
  }

  unTick() {
    this.timer && clearInterval(this.timer);
  }
}

class DigitalClock extends Observer {
  constructor(subject) {
    super();
    this._subject = subject;
    this._subject.attach(this);
  }

  update(subject) {
    if (subject === this._subject) {
      // 保证发出通知的目标是该时钟的目标
      this.draw();
    }
  }

  draw() {
    let hour = this._subject.getHour();
    let minute = this._subject.getMinute();
    let second = this._subject.getSecond();
    console.log(`我收到更新啦，hour ${hour} minute ${minute} second ${second}`);
  }

  remove() {
    this._subject.detach(this);
  }

  reWatch() {
    this._subject.attach(this);
  }
}

const clockTimer = new ClockTimer();
const digitalClock = new DigitalClock(clockTimer);
clockTimer.tick();

setTimeout(() => {
  digitalClock.remove();
  console.log("10s，取消观察");
}, 10000);

setTimeout(() => {
  digitalClock.reWatch();
  console.log("15s，重新开始观察");
}, 15000);

setTimeout(() => {
  clockTimer.unTick();
  console.log("20s，结束计时");
}, 20000);
