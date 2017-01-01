const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  provider: String,
  recentlyViewed: Array,
  securityLevel: { type: Number, default: 0},
  dateJoined: { type: Date, default: Date.now },
  imgUrl: { type:String, default: 'https://avatars0.githubusercontent.com/u/9276074?v=3&s=40'}
});
module.exports = mongoose.model('User', UserSchema);
