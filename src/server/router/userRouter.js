const express = require('express');
const { addUser, verifyUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', addUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/verifyUser', verifyUser, (req, res) => {
  // return res.status(200)
  return res.redirect('http://localhost:3030/dashboard')
});


module.exports = router;
