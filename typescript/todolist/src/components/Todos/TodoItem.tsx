import * as React from "react";
import { Todo } from "@/models";

interface Props {
  todo: Todo;
}

const toDoItemStyle: React.CSSProperties = {
  color: "red",
  backgroundColor: "green",
};

const TodoItem: React.FC<Props> = (props: Props) => {
  return <li style={toDoItemStyle}>{props.todo.text}</li>;
};

export default TodoItem;
