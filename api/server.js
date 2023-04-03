const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Anapaula1973",
  database: "gb_regapp",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while checking the database.");
      } else if (result.length === 0) {
        res.status(404).send("Username or password is incorrect.");
      } else {
        const user = {
          username: result[0].username,
          password: result[0].password,
        };
        res.send(user);
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
        res.status(201).send({
          id: result.insertId,
          name,
          startTime,
          endTime,
          capacity,
        });
        res.status(200).send(`Class "${name}" created successfully!`);
      }
    }
  );
});

app.post("/api/check-ins", (req, res) => {
  const { classId } = req.body;
  const checkInTime = new Date();

  db.query(
    "INSERT INTO check_ins (class_id, user_id, check_in_time) VALUES (?, ?, ?)",
    [classId, userId, checkInTime],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error checking in");
      } else {
        res.status(200).send("Checked in successfully");
      }
    }
  );
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

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
