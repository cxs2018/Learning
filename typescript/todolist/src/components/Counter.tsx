import * as React from "react";

interface Props {
  number: number;
}

// Props 会加上 children： Readonly<Props> & Readonly<{children?: ReactNode}>
// type ComponentProps = React.PropsWithChildren<Props>;

export default class Counter extends React.Component<Props, any> {
  render() {
    const { number } = this.props;
    return (
      <div>
        <p>{number}</p>
      </div>
    );
  }
}
