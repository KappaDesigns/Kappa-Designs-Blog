const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article.js');
router.get('/article/', (req, res, next) => {
  Article.find({featured: false}, (err, todos) => {
    if (err) return next(err);
    res.json(todos);
  }).sort({ dateCreated: -1 })
});

/* POST /todos */
router.post('/article', (req, res, next) => {
  console.log(req.body);
  Article.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/article/:id', (req, res, next) => {
  Article.findById(req.params.id, (err, post) => {
    if (err) return next (err);
    res.json(post);
  })
})

router.get('/article/title/:title', (req, res, next) => {
  Article.find({title: req.params.title}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).sort({ dateCreated: -1 });
});

router.get('/article/tag/:tag', (req, res, next) => {
  Article.find({tag: req.params.tag}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).sort({ dateCreated: -1 })
})

router.put('/article/:id', (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})

router.delete('/article/:id', (req, res, next) => {
  Article.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
})

module.exports = router;
