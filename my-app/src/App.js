import "./App.css";
import React, { useState } from "react";
import Login from "./pages/login/Login";
import Home from "./components/home/Home";
import Register from "./pages/register/Register";
import CreateClass from "./components/createClass/CreateClass";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TodayClasses from "./components/todayClasses/TodayClasses";
function App() {
  const [user, setUser] = useState("");
  function handleData(data) {
    setUser(data);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateClass />} />
          <Route path="/check-in" element={<TodayClasses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
