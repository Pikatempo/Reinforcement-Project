// import database
const db = require('../model');

const taskController = {};

taskController.addTask = async (req, res, next) => {
  const { task_name, due_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tasks (task_name, due_date) VALUES ($1, $2) RETURNING *',
      [task_name, due_date]
    );
    res.locals.tasks = result.rows[0];
  } catch (err) {
    return next(err);
  }
  return next();
};

taskController.deleteTask = async (req, res, next) => {
  return next();
};

taskController.updateTask = async (req, res, next) => {
  return next();
};

taskController.getTasks = async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM tasks;`);

    if (result.rowCount > 0) {
      res.locals.tasks = result.rows;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = taskController;
