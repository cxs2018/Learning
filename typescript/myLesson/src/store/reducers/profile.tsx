import { AnyAction } from "redux";
import { ProfileState } from "@/typings/state";

let initialState: ProfileState = {};

export default function (
  state: ProfileState = initialState,
  action: AnyAction,
): ProfileState {
  return state;
}
