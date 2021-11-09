import React, { useState } from "react";
import Axios from "axios";

interface data {
  expires: number;
  refresh_token: string;
  token: string;
  token_type: string;
}

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true)

  function logInHandler() {
    login().then((res) => {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      sessionStorage.setItem("expires", JSON.stringify(res.data.expires));
      window.location.replace("/home");
    }).catch(() => setIsValid(false));
  }

  function login() {
    return Axios.request<data>({
      method: "post",
      url: "http://127.0.0.1:8888/login",
      data: { username: userName, password: password },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res).catch(res => res);
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
      {!isValid? <p>username or password is invalid... or maybe both, idk</p> : <div></div>}
    </div>
  );
}

export default App;
