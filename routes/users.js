const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const checkUser = require("../middlewares/checkUser");

router.route("/users").get(getAllUsers).post(createUser);
router
  .route("/users/:id")
  .get(checkUser, getSingleUser)
  .put(checkUser, updateUser)
  .delete(checkUser, deleteUser);

module.exports = router;
