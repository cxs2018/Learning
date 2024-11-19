import * as React from "react";
import { Todo } from "@/models";
import { withDefaultProps, DefaultProps } from "@/utils";

interface OwnProps {
  addTodo: (todo: Todo) => void;
}

type Props = OwnProps & DefaultProps;

interface State {
  text: string;
}

let id = 0;

class TodoInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let text = this.state.text.trim();
    if (!text) return;
    this.props.addTodo({ id: id++, text });
    this.setState({
      text: "",
    });
  };

  render() {
    const { text } = this.state;
    const { settings } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleChange}
          maxLength={settings?.maxLength}
          placeholder={settings?.placeholder}
        />
        <button type={"submit"}>添加</button>
      </form>
    );
  }
}

export default withDefaultProps(TodoInput);
