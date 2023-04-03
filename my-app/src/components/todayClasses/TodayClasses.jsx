import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todayClasses.scss";
function TodayClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // Retrieve the classes happening on the current day from the server
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

  // Handle the form submission when the user checks in to a class
  function handleSubmit(event) {
    event.preventDefault();

    if (selectedClass === null) {
      return;
    }

    axios
      .post("http://localhost:8002/api/check-ins", {
        classId: selectedClass.id,
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

  return (
    <div>
      <h2>Today's Classes</h2>
      {classes.length === 0 ? (
        <p>No classes today.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <h3>{classItem.name}</h3>
              <p>Start time: {classItem.start_time}</p>
              <p>End time: {classItem.end_time}</p>
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
