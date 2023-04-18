import React from "react";
import "./navbar.scss";
import Logo from "../../docs/gb-logo.svg";
import { Link } from "react-router-dom";
export default function Navbar() {
  const username = JSON.parse(localStorage.getItem("username"));

  const logout = function () {
    window.localStorage.clear();
    window.location.reload();
    window.location.href = "/register";
  };
  return (
    <div>
      <nav className="fixed-nav-bar">
        <img src={Logo} alt="" className="nav-logo" />
        <div className="dropdown-buttons">
          <div className="dropdown">
            <button className="dropbtn">Options</button>
            <div className="dropdown-content">
              <a href="/check-in">Classes</a>
              <a href="/check-ins/today">Check-Ins</a>
              <a href="/create">Create Classes</a>
            </div>
          </div>
          {username ? (
            <div>
              <button onClick={logout} className="new-movie-button">
                Log-out
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="new-movie-button">Log-in</button>
              </Link>
              <Link to="/register">
                <button className="new-movie-button">Register</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
