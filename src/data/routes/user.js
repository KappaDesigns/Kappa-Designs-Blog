const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const async = require('async');
const crypto = require('crypto');

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
  console.log(req.body);
  User.findOneAndUpdate({ _id: req.params.id }, req.body, (err, post) => {
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

router.post('/user/forgot', (req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      console.log(req.body);
      User.findOne({ email: req.body.email }, function(err, user) {
        console.log(user);
        if (!user) {
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'ivansonofcoul',
          pass: 'Bertschi2012'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@kappadesings.org',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
})

module.exports = router;
