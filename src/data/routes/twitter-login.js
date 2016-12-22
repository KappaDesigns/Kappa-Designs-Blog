const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../../config');

passport.use(new TwitterStrategy({
  consumerKey: config.twitterID,
  consumerSecret: config.twitterSecret,
  callbackURL: '/auth/twitter/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({username: profile.displayName, provider: profile.provider}, (err, user) => {
    console.log(profile.provider);
    if (err) { return done(err); }
    if (user) {
      console.log(user);
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

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter'), (req, res, next) => {
  res.redirect('/#/');
});

module.exports = router;
