function User(props) {
  console.log("user props", props.history.state);
  return (
    <div>
      User
      <button onClick={() => props.history.goBack()}>返回</button>
    </div>
  );
}

export default User;
