import $ from "jquery";
import { createUnit } from "./unit";

function render(element, container) {
  let unit = createUnit(element);
  let makeUp = unit.getMarkUp(React.rootIndex);
  $(container).html(makeUp);
}

const React = {
  render,
  rootIndex: 0,
};

export default React;
