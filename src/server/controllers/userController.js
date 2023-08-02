
// import database
const db = require('../model');

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
    console.log('hiii');
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
    console.log('testtest')
      const { username, password } = req.body;
      const query = 'SELECT * FROM users WHERE username = $1 and password = $2';
      const result = await db.query(query, [username, password]);
      
      console.log('this is the result', result.rows[0])
      
    
    if (result.rows[0] !== undefined) {
    console.log('entered the if condition')
      res.locals.userDetails = result.rows[0];
    console.log('the res is', res.locals.userDetails)
    next();
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    };
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
