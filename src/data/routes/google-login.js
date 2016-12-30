const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../config');

passport.use(new GoogleStrategy({
  clientID  : config.googleID,
  clientSecret: config.googleSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({username: profile.displayName, provider: profile.provider}, (err, user) => {
    if (err) { return done(err); }
    if (user) {
      done(null, user);
    } else {
      User.create({
        username: profile.displayName,
        provider: profile.provider
      }, (err, user) => {
        if (err) { return done(err) }
        done(null, user);
      });
    }
  })
}));

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login']}));

router.get('/google/callback', passport.authenticate('google', {session: true}), (req, res, next) => {
  res.redirect('/#/');
})
module.exports = router;
