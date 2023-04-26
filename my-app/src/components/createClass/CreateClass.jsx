import React, { useState } from "react";
import axios from "axios";
import "./createClass.scss";
import Navbar from "../navbar/Navbar";
function CreateClass(props) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8002/api/classes", {
        name,
        startTime,
        endTime,
        capacity,
      })
      .then((response) => {
        console.log(response.data);
        setName("");
        setStartTime("");
        setEndTime("");
        setCapacity("");
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Error creating class. Please try again.");
      });
  };
  const userId = localStorage.getItem("user");
  if (userId !== "1") {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex-form">
        <div className="form__group field">
          <h1>Create Class</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form__label" htmlFor="name">
                Name:
              </label>
              <input
                className="form__field"
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label className="form__label" htmlFor="start-time">
                Start Time:
              </label>
              <input
                className="form__field"
                type="datetime-local"
                id="start-time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </div>
            <div>
              <label className="form__label" htmlFor="end-time">
                End Time:
              </label>
              <input
                className="form__field"
                type="datetime-local"
                id="end-time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </div>
            <div>
              <label className="form__label" htmlFor="capacity">
                Capacity:
              </label>
              <input
                className="form__field"
                type="number"
                id="capacity"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="create-button">
              Create Class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClass;
