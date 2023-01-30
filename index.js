require("dotenv").config();
const cors = require("cors");
const express = require("express");
const usersRoutes = require("./routes/users");

const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use("/", usersRoutes);

app.get("/", async (req, res) => {
  res.send(`<h1>Router Config</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
