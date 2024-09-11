// LivingBehaviorImpl.ts
import { LivingBehavior } from "./interfaces";

class LivingBehaviorImpl implements LivingBehavior {
  eat(): void {
    console.log("吃饭");
  }

  running(): void {
    console.log("跑步");
  }

  sleeping(): void {
    console.log("睡觉");
  }
}

export default LivingBehaviorImpl;
