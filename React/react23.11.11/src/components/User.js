function User(props) {
  console.log("user props", props.location.state);
  return (
    <div>
      User
      <button onClick={() => props.history.goBack()}>返回</button>
    </div>
  );
}

export default User;
