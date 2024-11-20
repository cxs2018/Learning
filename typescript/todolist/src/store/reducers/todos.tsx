import { ADD_TODO } from "@/action-type";
import { TodosAction } from "@/actions/todos";
import { Todo } from "@/models";

export interface TodosState {
  list: Array<Todo>;
}

let initialState: TodosState = { list: new Array<Todo>() };

export default function (
  state: TodosState = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return { list: [...state.list, action.payload] };
    default:
      return state;
  }
}
