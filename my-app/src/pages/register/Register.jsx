import React, { useState } from "react";
import axios from "axios";
import "./register.scss";
import Logo from "../../docs/gb-logo.svg";
import Navbar from "../../components/navbar/Navbar";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [beltrank, setBeltrank] = useState("white");
  function handleRegister(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8002/api/register", {
        username,
        password,
        beltrank,
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
  const handleBeltrankChange = (event) => {
    setBeltrank(event.target.value);
  };

  return (
    <div>
      <Navbar />
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
          <div>
            <label htmlFor="beltrank">Beltrank:</label>
            <select
              className="form-input"
              id="beltrank"
              value={beltrank}
              onChange={handleBeltrankChange}
            >
              <option value="white">White</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
            </select>
          </div>
          <button type="submit" className="form-button">
            Register
          </button>
          <img src={Logo} alt="" className="register-logo" />
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
