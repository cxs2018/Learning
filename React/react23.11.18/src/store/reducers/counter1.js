import * as types from "../action-types";
import { act } from "react-dom/test-utils";

let initialState = { number: 0 };

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD1:
      let payload = 1;
      if (action.payload !== undefined) {
        payload = action.payload > 0.5 ? 10 : -10;
      }
      return { number: state.number + payload };
    case types.MINUS1:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
