const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/Comment.js');

router.get('/comment', (req, res, next) => {
  Comment.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).sort({ dateCommented: -1 })
});

/* POST /todos */
router.post('/comment', (req, res, next) => {
  Comment.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/comment/:id', (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
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
