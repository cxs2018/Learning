import { ADD, MINUS } from "@/action-type";
import { CounterAction } from "@/actions/counter";

export interface CounterState {
  count: number;
}

let initialState: CounterState = { count: 0 };

export default function (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case ADD:
      return {
        count: state.count + 1,
      };
    case MINUS: {
      return {
        count: state.count - 1,
      };
    }
    default:
      return state;
  }
}
