import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./todayCheckin.scss";
export default function TodayCheckin(props) {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8002/api/check-ins/today")
      .then((response) => {
        setCheckIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(checkIns);
  return (
    <div>
      <Navbar />
      <div className="checkin-container">
        <h2>Today's Check-Ins</h2>
        {checkIns.length === 0 ? (
          <p>No check-ins today.</p>
        ) : (
          <ul className="check-ins">
            {checkIns.map((checkInItem) => (
              <li key={checkInItem.id} className="check-in">
                <h3>{checkInItem.id}</h3>
                <p>class to be attended: {checkInItem.class_id}</p>
                <p>user id: {checkInItem.user_id}</p>
                <p>
                  check-in time:{" "}
                  {new Date(checkInItem.check_in_time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
