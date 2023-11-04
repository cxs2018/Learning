import React from "./react";
import ReactDOM from "./react-dom";

function CounterA() {
  const [number, setNumber] = React.useState(0);
  const [number2, setNumber2] = React.useState(() => 20);
  let handleClick = () => {
    setNumber(number + 1);
    setNumber2((number) => number + 10);
  };
  React.useEffect(() => {
    console.log("CounterA DidMount");
    return () => {
      console.log("CounterA WillUnmount");
    };
  }, []);
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

// function reducer(state = { number: 0 }, action) {
//   switch (action.type) {
//     case "ADD":
//       return { number: state.number + 1 };
//     case "MINUS":
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// }
//
// function App() {
//   const [state, dispatch] = React.useReducer(reducer, { number: 0 });
//   return (
//     <div>
//       Count: {state.number}
//       <button onClick={() => dispatch({ type: "ADD" })}>+</button>
//       <button onClick={() => dispatch({ type: "MINUS" })}>-</button>
//       <CounterA />
//     </div>
//   );
// }

// function App() {
//   const [number, setNumber] = React.useState(0);
//   React.useEffect(() => {
//     console.log("开启一个新的定时器");
//     const $timer = setInterval(() => {
//       setNumber((number) => number + 1);
//     }, 1000);
//     // return () => {
//     //   console.log("销毁老的定时器");
//     //   clearInterval($timer);
//     // };
//   }, []);
//   return <p>{number}</p>;
// }

// const App = () => {
//   const ref = React.useRef();
//   React.useLayoutEffect(() => {
//     ref.current.style.transform = `translate(500px)`; //TODO
//     ref.current.style.transition = `all 500ms`;
//   });
//   let style = {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     backgroundColor: "red",
//   };
//   return <div style={style} ref={ref}></div>;
// };

function Child(props, ref) {
  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    set value(v) {
      inputRef.current.value = v;
    },
  }));
  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
}
const ForwardChild = React.forwardRef(Child);
function App() {
  let [number, setNumber] = React.useState(0);
  const inputRef = React.useRef();
  function getFocus() {
    console.log(inputRef.current);
    inputRef.current.value = "focus";
    inputRef.current.focus();
  }
  return (
    <div>
      {/*<ForwardChild ref={inputRef} />*/}
      <CounterA />
      <button onClick={getFocus}>获得焦点</button>
      <p>{number}</p>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
