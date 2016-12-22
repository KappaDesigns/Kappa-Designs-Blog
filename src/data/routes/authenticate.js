const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config');
router.post('/authenticate', (req, res, next) => {
  if (req.query.username !== undefined && (req.query.password !== undefined || req.query.provider !== undefined)) {
    User.findOne({username: req.query.username}, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({ succes: false, message: 'Authentication failed. User not found'})
      } else if (user) {
        if (user.password != req.query.password && (req.query.provider != 'google' || req.query.provider != 'facebook' || req.query.provider != 'twitter' || req.query.provider != 'local')) {
          console.log("here");
          res.json({ succes: false, message: 'Authentication failed. Wrong password'})
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 60 * 60 * 24
          });

          res.json({
            succes: true,
            message: 'Enjoy your token',
            token: token
          })
        }
      }
    })
  }
})

module.exports = router;
