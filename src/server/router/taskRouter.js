const express = require('express');
const {
  addTask,
  deleteTask,
  updateTask,
  getTasks,
} = require('../controllers/taskController.js');
const router = express.Router();

router.post('/', addTask, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

router.delete('/', deleteTask, (req, res) => {
  return res.status(200).send('success!');
});

router.put('/', updateTask, (req, res) => {
  return res.status(200).send('success!');
});

router.get('/', getTasks, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

module.exports = router;
