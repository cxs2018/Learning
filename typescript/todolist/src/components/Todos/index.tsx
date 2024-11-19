import * as React from "react";
import { Todo } from "@/models";
import TodoInput from "@/components/Todos/TodoInput";
import TodoItem from "@/components/Todos/TodoItem";

interface Props {}

interface State {
  todos: Array<Todo>;
}

export default class Todos extends React.Component<Props, State> {
  state = {
    todos: [] as Todo[],
  };

  addTodo = (todo: Todo) => {
    this.setState({
      todos: [...this.state.todos, todo] as Todo[],
    });
  };

  render() {
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        <ul>
          {this.state.todos.map((todo: Todo) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })}
        </ul>
      </div>
    );
  }
}
