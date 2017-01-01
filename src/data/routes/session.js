const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
  if (req.user !== undefined) {
    res.json(req.user);
  } else {
    res.sendStatus(403);
  }
})

router.get('/route', (req, res, next) => {
  res.redirect('/#/')
})

module.exports = router;
