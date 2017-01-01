const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    var unhashedPassword = password;
    var passedUsername = username;
    console.log('\n'+passedUsername+'\n');
    console.log(+unhashedPassword+'\n');
    User.findOne({ username: passedUsername, provider: 'local' }, function(err, user) {
      console.log(user+"\n");
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
  passport.authenticate('local', {session: true}, (err, user, info) => {
    if (err) { return next(err); }
    console.log('\n'+user+'\n');
    if (!user) { return res.status(404).send({ message: 'Failed To Login', success: false }); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(200).send({
        message:'Success',
        success: true,
      });
    })
  })(req,res,next);
})
module.exports = router;
