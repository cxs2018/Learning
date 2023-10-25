import $ from "jquery";
import { createUnit } from "./unit";
import { createElement } from "./element";
import { Component } from "./component";

function render(element, container) {
  let unit = createUnit(element);
  let makeUp = unit.getMarkUp("0");

  $(container).html(makeUp);
  $(document).trigger("mounted");
}

const React = {
  render,
  createElement,
  Component,
};

export default React;
