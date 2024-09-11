export interface IBehavior {}

export interface LivingBehavior extends IBehavior {
  eat(): void;
  running(): void;
  sleeping(): void;
}

export interface WorkingBehavior extends IBehavior {
  goToWork(): void;
  goOffWork(): void;
  meeting(): void;
}

export interface BehaviorComposer {
  add(behavior: IBehavior): void;
}
