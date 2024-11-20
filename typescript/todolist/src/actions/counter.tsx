import { ADD, MINUS } from "@/action-type";
import { LocationDescriptorObject } from "history";
import { TodosLocationState } from "@/components/Todos";
import { CallHistoryMethodAction, push } from "connected-react-router";

export function add() {
  return {
    type: ADD,
  };
}

export function minus() {
  return {
    type: MINUS,
  };
}

export function go(
  location: LocationDescriptorObject<TodosLocationState>,
): CallHistoryMethodAction {
  return push(location);
}

export type CounterAction = ReturnType<typeof add> | ReturnType<typeof minus>;
