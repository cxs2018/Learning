import React from "./react";
import ReactDOM from "./react-dom";

function CounterA() {
  const [number, setNumber] = React.useState(0);
  const [number2, setNumber2] = React.useState(() => 20);
  let handleClick = () => {
    setNumber(number + 1);
    setNumber2((number) => number + 10);
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
//
// function CounterB() {
//   const [number, setNumber] = React.useState(0);
//   const [number2, setNumber2] = React.useState(10);
//   let handleClick = () => {
//     setNumber(number + 1);
//     setNumber2(number2 + 10);
//   };
//   return (
//     <div>
//       <p>
//         {number}-{number2}
//       </p>
//       <button onClick={handleClick}>+</button>
//     </div>
//   );
// }
//
// function App() {
//   const [number, setNumber] = React.useState(0);
//   let handleClick = () => setNumber(number + 1);
//   return (
//     <div>
//       <CounterA />
//       <CounterB />
//       <button onClick={handleClick}>+</button>
//     </div>
//   );
// }

// let Child = ({ data, handleClick }) => {
//   console.log("Child render");
//   return <button onClick={handleClick}>{data.number}</button>;
// };
// Child = React.memo(Child);
//
// function App() {
//   console.log("App render");
//   const [name, setName] = React.useState("zhufeng");
//   const [number, setNumber] = React.useState(0);
//   let data = React.useMemo(() => ({ number }), [number]);
//   let handleClick = React.useCallback(() => setNumber(number + 1), [number]);
//   return (
//     <div>
//       <input
//         type="text"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       />
//       <Child data={data} handleClick={handleClick} />
//     </div>
//   );
// }

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case "ADD":
      return { number: state.number + 1 };
    case "MINUS":
      return { number: state.number - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { number: 0 });
  return (
    <div>
      Count: {state.number}
      <button onClick={() => dispatch({ type: "ADD" })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>-</button>
      <CounterA />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
