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
  height: Number,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false}
});
module.exports = mongoose.model('Article', ArticleSchema);
