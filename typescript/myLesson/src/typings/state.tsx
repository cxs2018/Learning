import { RouterState } from "connected-react-router";

export interface HomeState {}

export interface MineState {}

export interface ProfileState {}

export interface CombinedState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  router: RouterState;
}
