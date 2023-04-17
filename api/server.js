const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Anapaula1973",
  database: "gb_regapp",
});

app.post("/api/register", (req, res) => {
  const { username, password, beltrank } = req.body;

  db.query(
    "INSERT INTO users (username, password, beltrank) VALUES (?, ?, ?)",
    [username, password, beltrank],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error registering");
      } else {
        res.status(200).send("User created with success");
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error logging in");
      } else if (results.length === 0) {
        res.status(401).send("Invalid username or password");
      } else {
        const user = results[0];
        res.status(200).json({
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        });
      }
    }
  );
});

app.post("/api/classes", (req, res) => {
  const { name, startTime, endTime, capacity } = req.body;

  db.query(
    "INSERT INTO classes (name, start_time, end_time, capacity) VALUES (?, ?, ?, ?)",
    [name, startTime, endTime, capacity],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error creating class");
      } else {
        res.status(201).send(`Class "${name}" created successfully!`);
      }
    }
  );
});

app.post("/api/check-ins", (req, res) => {
  const { classId, userId } = req.body;
  console.log("class", classId);
  console.log("user", userId);
  // Check if the class exists
  db.query("SELECT * FROM classes WHERE id = ?", [classId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to check in. Please try again.");
      return;
    }

    if (result.length === 0) {
      res.status(400).send("Class not found.");
      return;
    }

    const classItem = result[0];

    // Check if the user exists
    db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Failed to check in. Please try again.");
        return;
      }

      if (result.length === 0) {
        res.status(400).send("User not found.");
        return;
      }

      // Check if the class is already full
      db.query(
        "SELECT COUNT(*) AS num_check_ins FROM check_ins WHERE class_id = ?",
        [classId],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Failed to check in. Please try again.");
            return;
          }

          const numCheckIns = result[0].num_check_ins;

          if (numCheckIns >= classItem.capacity) {
            res.status(400).send("Class is already full.");
            return;
          }

          // Insert the check-in record into the database
          const checkInTime = new Date();
          db.query(
            "INSERT INTO check_ins (class_id, user_id, check_in_time) VALUES (?, ?, ?)",
            [classId, userId, checkInTime],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Failed to check in. Please try again.");
                return;
              }

              res.send(`Checked in to ${classItem.name} at ${checkInTime}.`);
            }
          );
        }
      );
    });
  });
});

app.get("/api/classes/today", (req, res) => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  db.query(
    "SELECT * FROM classes WHERE start_time >= ? AND end_time <= ?",
    [startOfToday, endOfToday],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving classes");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/check-ins/today", (req, res) => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  db.query(
    "SELECT * FROM check_ins WHERE check_in_time >= ? AND check_in_time <= ?",
    [startOfToday, endOfToday],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving classes");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
