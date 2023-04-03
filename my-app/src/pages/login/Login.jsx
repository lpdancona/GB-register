import React, { useState } from "react";
import "./login.scss";
import Axios from "axios";
import Logo from "../../docs/gb-logo.svg";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const login = () => {
    Axios.post("http://localhost:8002/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from reloading the page
    login();
    props.onData(user);
  };

  return (
    <div className="login-container">
      <div className="login">
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">login</button>
          <img src={Logo} alt="" />
        </form>
      </div>
    </div>
  );
}

export default Login;
