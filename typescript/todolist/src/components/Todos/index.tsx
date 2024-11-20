import * as React from "react";
import { Todo } from "@/models";
import TodoInput from "@/components/Todos/TodoInput";
import TodoItem from "@/components/Todos/TodoItem";
import { connect } from "react-redux";
import { CombinedState, TodosState } from "@/store/reducers";
import * as actions from "@/actions/todos";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

interface Params {}

export interface TodosLocationState {
  name: string;
}

type Props = TodosState &
  typeof actions &
  RouteComponentProps<Params, StaticContext, TodosLocationState>;

class Todos extends React.Component<Props, any> {
  render() {
    const { addTodo, list, location } = this.props;
    return (
      <div>
        <p>name: {location.state.name}</p>
        <TodoInput addTodo={addTodo} />
        <ul>
          {list.map((todo: Todo) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: CombinedState): TodosState => state.todos;

export default connect(mapStateToProps, actions)(Todos);
