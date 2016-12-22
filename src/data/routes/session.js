const express = require('express');
const router = express.Router();

router.get('/session', (req, res, next) => {
  res.json(req.user);
})

router.get('/route', (req, res, next) => {
  res.redirect('/#/')
})

module.exports = router;
