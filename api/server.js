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

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
