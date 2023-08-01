// import database
const db = require('../model');

const taskController = {};

taskController.addTask = async (req, res, next) => {
  let { task_name, due_date, completed, expired } = req.body;
  if (completed === undefined) {
    completed = false;
  }

  if (expired === undefined) {
    expired = false;
  }

  try {
    const result = await db.query(
      'INSERT INTO tasks (task_name, due_date, completed, expired) VALUES ($1, $2,$3, $4) RETURNING *',
      [task_name, due_date, completed, expired]
    );
    res.locals.tasks = result.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM tasks WHERE task_id = $1', [id]);

    return result.rowCount > 0 ? next() : next(err);
  } catch (err) {
    return next(err);
  }
};

taskController.updateTask = async (req, res, next) => {
  let { task_id, task_name, due_date, completed, expired } = req.body;
  if (completed === undefined) {
    completed = false;
  }

  if (expired === undefined) {
    expired = false;
  }

  try {
    const result = await db.query(
      `UPDATE tasks
      SET task_name = $1,
      due_date = $2,
      completed = $3,
      expired = $4
      WHERE task_id = $5 returning *`,
      [task_name, due_date, completed, expired, task_id]
    );
    res.locals.tasks = result.rows[0];

    return next();
  } catch (err) {
    return next(err);
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM tasks WHERE expired = false and completed = false ;`
    );

    if (result.rowCount > 0) {
      res.locals.tasks = result.rows;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = taskController;
