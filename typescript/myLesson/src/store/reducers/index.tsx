import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import home, { HomeState } from "./home";
import mine, { MineState } from "./mine";
import profile, { ProfileState } from "./profile";
import history from "@/history";

interface CombinedState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  router: RouterState;
}

let reducers: ReducersMapObject<CombinedState, AnyAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history),
};

const rootReducer: Reducer<CombinedState, AnyAction> =
  combineReducers<CombinedState>(reducers);

export type CombinedState2 = {
  [key in keyof typeof reducers]: ReturnType<(typeof reducers)[key]>;
};

export default rootReducer;
