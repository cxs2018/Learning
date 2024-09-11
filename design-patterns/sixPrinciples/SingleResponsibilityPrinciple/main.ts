import LivingBehaviorImpl from "./LivingBehaviorImpl"; // 确保路径正确
import WorkingBehaviorImpl from "./WorkingBehaviorImpl"; // 确保路径正确
import IBehaviorComposerImpl from "./IBehaviorComposerImpl"; // 确保路径正确
import { LivingBehavior, WorkingBehavior } from "./interfaces"; // 确保路径正确

function main() {
  // 张三--全职妈妈
  const zslivingBehavior: LivingBehavior = new LivingBehaviorImpl();
  const zsBehaviorComposer = new IBehaviorComposerImpl();
  zsBehaviorComposer.add(zslivingBehavior);
  zsBehaviorComposer.doSomething();

  // 李四--职场妈妈
  const lsLivingBehavior: LivingBehavior = new LivingBehaviorImpl();
  const lsWorkingBehavior: WorkingBehavior = new WorkingBehaviorImpl();

  const lsBehaviorComposer = new IBehaviorComposerImpl();
  lsBehaviorComposer.add(lsLivingBehavior);
  lsBehaviorComposer.add(lsWorkingBehavior);
  lsBehaviorComposer.doSomething();
}

main();
