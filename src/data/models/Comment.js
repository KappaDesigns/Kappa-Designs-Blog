const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  userBy: String,
  comment: String,
  likes: Number,
  dislikes: Number,
  replies: Array,
  dateCommented: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', CommentSchema);
