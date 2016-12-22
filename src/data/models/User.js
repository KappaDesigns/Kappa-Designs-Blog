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
  dateJoined: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
