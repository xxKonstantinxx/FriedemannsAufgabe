import React, { useState } from "react";
import { Login } from '../../logic/data-handler'


function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  function logInHandler() {
    Login(userName, password)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
        sessionStorage.setItem("expires", JSON.stringify(res.data.expires));
        window.location.replace("/home");
      })
      .catch(() => setIsValid(false));
  }

  return (
    <div className="App login">
      <h1>Login</h1>
      <div className="login_page">
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button
          className="btn"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            logInHandler();
          }}
        >
          Log in
        </button>
      </div>
      {!isValid ? (
        <p>username or password is invalid... or maybe both, idk</p>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
