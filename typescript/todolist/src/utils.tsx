import * as React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

// function myHoistNonReactStatics<
//   N extends React.ComponentType<any>,
//   O extends React.ComponentType<any>,
// >(NewComponent: N, OldComponent: O): N & O {
//   let keys = Object.getOwnPropertyNames(OldComponent);
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     const descriptor = Object.getOwnPropertyDescriptor(OldComponent, key);
//     Object.defineProperty(NewComponent, key, descriptor);
//   }
//   return NewComponent as N & O;
// }

let defaultProps = {
  settings: {
    maxLength: 6,
    placeholder: "请输入待办事项",
  },
};

export type DefaultProps = Partial<typeof defaultProps>;

export const withDefaultProps = <P extends DefaultProps>(
  OldComponent: React.ComponentType<P>,
) => {
  type OwnProps = Omit<P, keyof DefaultProps>;
  class NewComponent extends React.Component<OwnProps, any> {
    render() {
      let props = { ...defaultProps, ...this.props } as P;
      return <OldComponent {...props} />;
    }
  }
  // 提升 OldComponent 非 React 官方的静态属性到 NewComponent
  return hoistNonReactStatics(NewComponent, OldComponent);
};
