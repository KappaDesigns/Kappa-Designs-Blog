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
  imgUrl: { type:String, default: 'http://image.flaticon.com/icons/svg/149/149071.svg'}
});
module.exports = mongoose.model('User', UserSchema);
