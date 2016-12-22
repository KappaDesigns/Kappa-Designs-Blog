const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
  title: String,
  desc: String,
  author: String,
  tag: String,
  bgImagePath: String,
  sections: Array,
  commentIDS: Array,
  likes: Number,
  hoverColor: String,
  dislikes: Number,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Article', ArticleSchema);
