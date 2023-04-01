import "./App.css";
import Login from "./pages/login/Login";
import Home from "./components/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const user = false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/Register" />}
          />
          <Route
            path="/register"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
