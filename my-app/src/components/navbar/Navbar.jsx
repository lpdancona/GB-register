import React from "react";
import "./navbar.scss";
import Logo from "../../docs/gb-logo.svg";

export default function Navbar() {
  const username = JSON.parse(localStorage.getItem("username"));
  const logout = function () {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <nav className="fixed-nav-bar">
        <img src={Logo} alt="" className="nav-logo" />
        <div className="dropdown-buttons">
          <div className="dropdown">
            <button className="dropbtn">Options</button>
            <div className="dropdown-content">
              <a href="#">Classes</a>
              <a href="#">Check-Ins</a>
              <a href="#">Create</a>
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
              <button className="new-movie-button">Log-in</button>
              <button className="new-movie-button">Register</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
