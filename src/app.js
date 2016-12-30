const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();
const app = express();

const User = require('./data/models/User');
const article = require('./data/routes/article');
const comment = require('./data/routes/comment');
const user = require('./data/routes/user');
const authenticate = require('./data/routes/authenticate');
const api = require('./data/routes/api');
const login = require('./data/routes/login');
const facebook = require('./data/routes/facebook-login');
const google = require('./data/routes/google-login');
const twitter = require('./data/routes/twitter-login');
const logout = require('./data/routes/logout');
const authsession = require('./data/routes/session');

mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect(config.db)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('DankMemesCantMeltSteelBeams'));
app.use(session({
  secret: 'DankMemesCantMeltSteelBeams',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

app.use('/api', api);
app.use('/api', article);
app.use('/api', comment);
app.use('/api', user);
app.use('/', authenticate);
app.use('/auth', login);
app.use('/auth', facebook);
app.use('/auth', google);
app.use('/auth', twitter);
app.use('/auth', logout);
app.use('/auth', authsession);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app;
