const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/Comment.js');

router.get('/comment/:id', (req, res, next) => {
  Comment.find(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).sort({ dateCommented: -1 })
});

/* POST /todos */
router.post('/comment', (req, res, next) => {
  if (req.user !== undefined) {
    req.body.userBy = req.user.username;
    Comment.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    req.body.userBy = 'Guest';
    Comment.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  }
});

router.put('/comment/:id', (req, res, next) => {
  console.log(req.body);
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    console.log(post);
    if (err) return next(err);
    res.json(post);
  })
})

router.delete('/comment/:id', (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})
module.exports = router;
