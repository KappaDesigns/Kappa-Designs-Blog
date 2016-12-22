const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');

router.get('/user', (req, res, next) => {
  User.find((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /todos */
router.post('/user', (req, res, next) => {
  User.findOne({username: req.query.username}, (err, post) => {
    if (!post) {
      User.create(req.query, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      res.sendStatus(400);
    }
  })

});

router.get('/user/:username', (req, res, next) => {
  User.find({username: req.params.username}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})

router.put('/user/:id', (req, res, next) => {
  User.update(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})

//update username

//update password

router.delete('/user/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})

module.exports = router;
