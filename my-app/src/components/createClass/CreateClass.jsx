import React, { useState } from "react";
import axios from "axios";
import "./createClass.scss";

function CreateClass() {
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="start-time">Start Time:</label>
        <input
          type="datetime-local"
          id="start-time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-time">End Time:</label>
        <input
          type="datetime-local"
          id="end-time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Create Class</button>
    </form>
  );
}

export default CreateClass;
