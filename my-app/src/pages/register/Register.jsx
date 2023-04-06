import React, { useState } from "react";
import axios from "axios";
import "./register.scss";
import Logo from "../../docs/gb-logo.svg";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8002/api/register", {
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
        setErrorMessage("Error occurred while registering the user");
      });
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            className="form-input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Register
        </button>
        <img src={Logo} alt="" className="register-logo" />
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Register;
