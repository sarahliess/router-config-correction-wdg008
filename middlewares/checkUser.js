const pool = require("../db");

const checkUser = async (req, res, next) => {
  console.log("inside the middleware");
  const { id } = req.params;
  try {
    const {
      rows: [user],
      rowCount,
    } = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    if (!rowCount) {
      return res.status(404).send(`User with the id ${id} does not exist`);
    }
    //neue Property an Req Objekt anhängen (reist ab sofort mit)
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports = checkUser;
