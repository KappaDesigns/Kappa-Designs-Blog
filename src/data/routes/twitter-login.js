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
  console.log(profile);
  let img = 'http://image.flaticon.com/icons/svg/149/149071.svg'
  if (profile.hasOwnProperty('photos')) {
    img = profile.photos[0].value;
  }
  User.findOne({username: profile.username, provider: profile.provider}, (err, user) => {
    console.log(profile.provider);
    if (err) { return done(err); }
    if (user) {
      console.log(user);
      done(null, user);
    } else {
      User.create({
        username: profile.displayName,
        provider: profile.provider,
        imgUrl: img
      }, (err, user) => {
        if (err) { return done(err) }
        done(null, user);
      });
    }
  })
}));

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {session: true}), (req, res, next) => {
  res.redirect('/#/');
});

module.exports = router;
