const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
})

module.exports = router;
