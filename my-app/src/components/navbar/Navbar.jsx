import React from "react";
import "./navbar.scss";
export default function Navbar() {
  return (
    <div>
      <nav class="fixed-nav-bar">
        <a class="brand"></a>
        <a class="link" href="#">
          archive
        </a>
        <a class="link" href="#">
          projects
        </a>
      </nav>
    </div>
  );
}
