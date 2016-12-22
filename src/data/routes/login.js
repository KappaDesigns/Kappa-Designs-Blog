const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    var unhashedPassword = password;
    var passedUsername = username;
    User.findOne({ username: passedUsername, provider: 'local' }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('Incorrect username:');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) { return next(err); }
    if (!user) { return res.sendStatus(404); }
    console.log(req.logIn);
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      console.log(req.user);
      return res.send(user);
    })
  })(req,res,next);
})
module.exports = router;
