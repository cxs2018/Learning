import React from "./react";
import ReactDOM from "./react-dom";

function CounterA() {
  const [number, setNumber] = React.useState(0);
  let handleClick = () => setNumber(number + 1);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

function CounterB() {
  const [number, setNumber] = React.useState(0);
  const [number2, setNumber2] = React.useState(10);
  let handleClick = () => {
    setNumber(number + 1);
    setNumber2(number2 + 10);
  };
  return (
    <div>
      <p>
        {number}-{number2}
      </p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

function App() {
  const [number, setNumber] = React.useState(0);
  let handleClick = () => setNumber(number + 1);
  return (
    <div>
      {number % 2 === 0 ? <CounterA /> : null}
      <CounterB />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
