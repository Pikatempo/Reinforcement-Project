const express = require('express');
const { addUser, verifyUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', addUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;
