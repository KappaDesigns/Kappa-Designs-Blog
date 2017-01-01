const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config');

passport.use(new FacebookStrategy({
  clientID: config.facebookID,
  clientSecret: config.facebookSecret,
  callbackURL: '/auth/facebook/callback',
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

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {session: true }), (req, res, next) => {
  res.redirect('/auth/route');
});

module.exports = router;
