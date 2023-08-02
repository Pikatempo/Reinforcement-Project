// import database
const db = require('../model');

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
    console.log('hiii', req.body);
    let { name, username, password } = req.body;

    const result = await db.query(
      'INSERT INTO users (username, name, password) VALUES ($1, $2, $3) RETURNING *',
      [username, name, password]
    );

    res.locals.user = result.rows[0];

    next();
  } catch (err) {
    next(err);
  }
};

userController.verifyUser = async (req, res, next) => {};

module.exports = userController;
