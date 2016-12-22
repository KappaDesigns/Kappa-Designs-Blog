const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
  title: String,
  desc: String,
  author: String,
  tag: String,
  bgImagePath: String,
  HTML: String,
  commentIDS: Array,
  likes: Number,
  dislikes: Number,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Article', ArticleSchema);
