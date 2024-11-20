import { ADD_TODO } from "@/action-type";
import { Todo } from "@/models";

export function addTodo(toDo: Todo) {
  return {
    type: ADD_TODO,
    payload: toDo,
  };
}

export type TodosAction = ReturnType<typeof addTodo>;
