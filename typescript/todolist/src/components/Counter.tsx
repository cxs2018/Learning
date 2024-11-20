import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "@/store/reducers";
import * as actions from "@/actions/counter";
import { RouteComponentProps } from "react-router-dom";
import { LocationDescriptorObject } from "history";
import { TodosLocationState } from "./Todos";

interface Params {
  name: string;
}

type Props = CounterState & typeof actions & RouteComponentProps<Params>;

// Props 会加上 children： Readonly<Props> & Readonly<{children?: ReactNode}>
// type ComponentProps = React.PropsWithChildren<Props>;

class Counter extends React.Component<Props, any> {
  render() {
    const { count, add, minus, match, go } = this.props;
    const path: LocationDescriptorObject<TodosLocationState> = {
      pathname: "/todos",
      state: { name: "toDosNameFromCounter" },
    };
    return (
      <div>
        <p>name:{match.params.name}</p>
        <p>{count}</p>
        <button onClick={add}>+</button>
        <button onClick={minus}>-</button>
        <button onClick={() => go(path)}>/todos</button>
      </div>
    );
  }
}

const mapStateToProps = (state: CombinedState): CounterState => state.counter;

export default connect(mapStateToProps, actions)(Counter);
