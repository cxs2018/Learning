import React from "react";
import ReactReduxContext from "./ReactReduxContext";
import { bindActionCreators } from "../redux";

function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = store;
      const prevState = getState(); // 获取仓库中的总状态
      const stateProps = React.useMemo(
        () => mapStateToProps(prevState),
        [prevState],
      );
      let dispatchProps = React.useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch);
        } else {
          dispatchProps = { dispatch: dispatch };
        }
        return dispatchProps;
      }, [store]);
      const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
      React.useEffect(() => {
        return subscribe(forceUpdate);
      }, [store]);
      return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

function connectClassVersion(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(this.forceUpdate);
      }
      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { store } = this.context;
        const { getState, dispatch, subscribe } = store;
        const prevState = getState(); // 获取仓库中的总状态
        const stateProps = mapStateToProps(prevState);
        let dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        return (
          <OldComponent {...this.props} {...stateProps} {...dispatchProps} />
        );
      }
    };
  };
}

export default connect;
