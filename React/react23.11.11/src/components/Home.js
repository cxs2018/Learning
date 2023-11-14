function Home(props) {
  console.log("home props", props);
  return (
    <div>
      Home
      <button
        onClick={() =>
          props.history.push("/user/234/helloworld", { name: "用户管理" })
        }
      >
        转到user
      </button>
    </div>
  );
}

export default Home;
