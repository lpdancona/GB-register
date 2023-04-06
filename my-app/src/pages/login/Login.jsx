import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import Logo from "../../docs/gb-logo.svg";
import Navbar from "../../components/navbar/Navbar";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8002/api/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.id));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );
        window.location.href = "/check-in";
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid username or password");
      });
  }

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="form-input"
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
          <img src={Logo} alt="" className="register-logo" />
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
