// import database
const db = require('../model');

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
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

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1 and password = $2';
    const result = await db.query(query, [username, password]);

    if (result.rows[0] !== undefined) {
      res.locals.userInfo = result.rows[0];
      // console.log(res.locals.userInfo)
      return next();
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
