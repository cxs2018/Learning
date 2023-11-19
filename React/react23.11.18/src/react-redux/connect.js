import React from "react";
import ReactReduxContext from "./ReactReduxContext";
import { bindActionCreators } from "../redux";

function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = store;
      const prevState = getState(); // 获取仓库中的总状态
      const stateProps = mapStateToProps(prevState);
      let dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
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
        return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
      }
    };
  };
}

export default connect;
