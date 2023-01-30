const pool = require("../db");

const getAllUsers = async (req, res) => {
  try {
    const { rows: allUsers } = await pool.query("SELECT * FROM users");
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
};

const getSingleUser = async (req, res) => {
  console.log("inside controller", req.user);
  const singleUser = req.user;
  res.status(200).json(singleUser);
};

const createUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  console.log(req.body);
  try {
    const {
      rows: [createdUser],
    } = await pool.query(
      "INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING*",
      [username, password, firstname, lastname]
    );
    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

const updateUser = async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  const { username, password, firstname, lastname } = req.body;
  try {
    const {
      rows: [updatedUser],
    } = await pool.query(
      "UPDATE users SET username = $1, password =$2, firstname=$3, lastname=$4 WHERE id = $5 RETURNING *",
      [username, password, firstname, lastname, id]
    );
    return res.status(201).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [deletedUser],
    } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    console.log(deletedUser);
    return res.status(200).send(`User with the id ${id} has been deleted.`);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
