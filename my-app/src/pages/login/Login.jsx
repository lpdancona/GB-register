import React, { useState } from "react";
import "./login.scss";
import Axios from "axios";
function Login() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:8002/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };
  const login = () => {
    Axios.post("http://localhost:8002/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login-container">
      <div className="registration">
        <h1>Register</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>login</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>login</button>
      </div>
    </div>
  );
}

export default Login;
