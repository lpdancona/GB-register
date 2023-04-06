import React, { useState, useEffect } from "react";
import axios from "axios";

function TodayClasses(props) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("user")
  );

  useEffect(() => {
    axios
      .get("http://localhost:8002/api/classes/today")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedClass === null) {
      return;
    }

    axios
      .post("http://localhost:8002/api/check-ins", {
        classId: selectedClass.id,
        userId: localStorage.getItem("user"),
      })
      .then((response) => {
        alert(`You've checked in to ${selectedClass.name}!`);
        setSelectedClass(null);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to check in. Please try again.");
      });
  }
  const username = JSON.parse(localStorage.getItem("username"));
  return (
    <div>
      <h1>Logged in as {username}</h1>
      <h2>Today's Classes</h2>
      {classes.length === 0 ? (
        <p>No classes today.</p>
      ) : (
        <ul className="classes">
          {classes.map((classItem) => (
            <li key={classItem.id} className="class">
              <h3>{classItem.name}</h3>
              <p>
                Start time: {new Date(classItem.start_time).toLocaleString()}
              </p>
              <p>End time: {new Date(classItem.end_time).toLocaleString()}</p>
              <p>Capacity: {classItem.capacity}</p>
              <button onClick={() => setSelectedClass(classItem)}>
                Check In
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedClass !== null && (
        <form onSubmit={handleSubmit}>
          <h3>Check In to {selectedClass.name}</h3>
          <p>Are you sure you want to check in to this class?</p>
          <button type="submit">Yes</button>
          <button type="button" onClick={() => setSelectedClass(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default TodayClasses;
