import React, { useState } from "react";
import axios from "axios";

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
        console.log(response.data.id);
        localStorage.setItem("user", JSON.stringify(response.data.id));
        window.location.href = "/check-in";
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid username or password");
      });
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
