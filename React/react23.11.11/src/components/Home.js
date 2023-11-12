function Home(props) {
  return (
    <div>
      Home
      <button onClick={() => props.history.push("/user", { name: "用户管理" })}>
        转到user
      </button>
    </div>
  );
}

export default Home;
