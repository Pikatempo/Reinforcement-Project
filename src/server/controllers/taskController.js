// import database
const db = require('../model');

const taskController = {};

taskController.addTask = (req, res, next) => {
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
