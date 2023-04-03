import React, { useState } from "react";
import "./register.scss";
import Axios from "axios";

export default function Register(props) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [user, setUser] = useState("");
  const register = () => {
    Axios.post("http://localhost:8002/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      setUser(response.data);
    });
  };

  const handleClick = () => {
    register();
    props.onData(user);
  };

  return (
    <div>
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
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
}
