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
function App() {
  const [user, setUser] = useState("");
  function handleData(data) {
    setUser(data);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                <Home username={user.username} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? <Login onData={handleData} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/register"
            element={
              !user ? <Register onData={handleData} /> : <Navigate to="/" />
            }
          />
          <Route path="/create" element={<CreateClass />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
