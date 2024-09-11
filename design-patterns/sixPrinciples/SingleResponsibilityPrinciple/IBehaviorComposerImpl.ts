// IBehaviorComposerImpl.ts
import {
  IBehavior,
  BehaviorComposer,
  LivingBehavior,
  WorkingBehavior,
} from "./interfaces";

function isLivingBehavior(behavior: IBehavior): behavior is LivingBehavior {
  return (behavior as LivingBehavior).eat !== undefined;
}

function isWorkingBehavior(behavior: IBehavior): behavior is WorkingBehavior {
  return (behavior as WorkingBehavior).goToWork !== undefined;
}

class IBehaviorComposerImpl implements BehaviorComposer {
  private behaviors: Array<IBehavior> = [];

  add(behavior: IBehavior): void {
    console.log("添加行为");
    this.behaviors.push(behavior);
  }

  doSomething(): void {
    this.behaviors.forEach((b) => {
      if (isLivingBehavior(b)) {
        const livingBehavior = b as LivingBehavior;
        // 处理生活行为
        livingBehavior.eat();
        livingBehavior.running();
        livingBehavior.sleeping();
      } else if (isWorkingBehavior(b)) {
        const workingBehavior = b as WorkingBehavior;
        // 处理工作行为
        workingBehavior.goToWork();
        workingBehavior.goOffWork();
        workingBehavior.meeting();
      }
    });
  }
}

export default IBehaviorComposerImpl;
