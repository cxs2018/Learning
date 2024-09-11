// WorkingBehaviorImpl.ts
import { WorkingBehavior } from "./interfaces";

class WorkingBehaviorImpl implements WorkingBehavior {
  goToWork(): void {
    console.log("上班");
  }

  goOffWork(): void {
    console.log("下班");
  }

  meeting(): void {
    console.log("开会");
  }
}

export default WorkingBehaviorImpl;
